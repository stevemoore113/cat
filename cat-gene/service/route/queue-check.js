const md5 = require('md5');
const mongodb = require('mongodb')
const checkQueue = require('./gen-report');
const mongoDbQueue = require('mongodb-queue')
const CustomHttpOption = require('./../custom-http-option');
const { default: nodeFetch } = require('node-fetch');
const https = require('https');

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })

const nextTime = 1000;//間隔一秒
const checkMaxTime = 20000 / 1000;//20秒
const visibilityTime = 1; //一秒鐘後進入列隊
const delayTime = 10; //幾秒後加入列隊
const maxTries = 2; // 失敗一次就加入deadqueue

async function wait(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("anything");
    }, ms);
  });
};

/**
 * 做好或者時間結束則返回開始下一筆
 */
async function maxAwait(oResData, queue, maxTime, checkColl) {
  let resData = await checkColl.findOne({ md5: oResData.md5 })
  if (maxTime === 0) {
    console.log('out limit time', maxTime, oResData.md5);
    return resData;
  }
  console.log('data', maxTime);
  if (resData.status === 'close') {
    console.log('done task', maxTime);
    return resData;
  }
  await wait(nextTime);
  maxTime = maxTime - 1;

  return await maxAwait(resData, queue, maxTime, checkColl)
}

/**
 * @description Try post request via application/json
 * @param {import('../custom-models/custom-http-option')} options
 * @returns {Promise<CustomResult>} result
 */
async function tryPostJson(options) {
  if (!options) {
    throw new Error('Options is null');
  }
  const opt = {
    body: {},
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };
  options.parameters.forEach((val, key) => {
    opt.body[key] = val;
  });
  opt.body = JSON.stringify(opt.body);
  options.headers.forEach((val, key) => {
    opt.headers[key] = val;
  });

  const result = await nodeFetch(options.url, opt);

  return result;
}

client.connect(async (err) => {
  const db = client.db('test')
  const deadQueue = mongoDbQueue(db, 'deadQueue');
  const _option = {
    visibility: visibilityTime,
    delay: delayTime,
    deadQueue: deadQueue,
    maxRetries: maxTries
  };
  /**
   * @param db 
   * @param visibility 資料接收後可被看的秒數，秒數到了會回到等待列表變成可以重新拿出的狀態
   * @param delay 資料傳送時延遲多久才能進入等待列表讓他可以被讀取
   */
  const queue = mongoDbQueue(db, 'my-queue-test', _option)
  const isRun = true;

  const getLine = async () => {
    return new Promise((resolve, reject) => {
      queue.get((err, msg) => {
        if (msg === undefined) { resolve(undefined); }
        else {
          resolve(msg);
        }
      })
    });
  };
  const getDone = async () => {
    return new Promise((resolve, reject) => {
      let msgData = '';
      queue.done((err, count) => {
        msgData += `done= ${count}`;
        resolve(msgData);
      })
    });
  };
  const getFlight = async () => {
    return new Promise((resolve, reject) => {
      let msgData = '';
      queue.inFlight((err, count) => {
        msgData += `inFlight= ${count}`;
        resolve(msgData);
      })
    });
  };
  const getTotal = async () => {
    return new Promise((resolve, reject) => {
      let msgData = '';
      queue.total((err, count) => {
        msgData += `total= ${count}`;
        resolve([count, msgData]);
      })
    });
  };
  const getSize = async () => {
    return new Promise((resolve, reject) => {
      let msgData = '';
      queue.size((err, count) => {
        msgData += `size= ${count}`;
        resolve([count, msgData]);
      })
    });
  };
  /** 
 * @param {*} msg need msg.act id 
 * @returns msg
 */
  const cleanOneData = async (msg) => {
    return new Promise((resolve, reject) => {
      queue.ack(msg.ack, (err, id) => {
        queue.clean((err) => {
          resolve([msg]);
        })
      })
    });
  };
  /** 
   * @param {*} msg need msg.act id 
   * @returns msg
   */
  const actOneData = async (msg) => {
    return new Promise((resolve, reject) => {
      let msgData = '';
      if (msg === undefined) {
        resolve(msg);
      }
      else {
        queue.ack(msg.ack, (err, id) => {
          resolve([msg]);
        })
      }
    });
  };
  let size = await getSize();
  let waitSec = 0;
  while (isRun) {
    await wait(nextTime);
    console.log('is run');
    size = await getSize();
    if (size[0] === 0) {
      console.log(waitSec);
      waitSec += 1;
      continue;
    }
    waitSec = 0;
    line = await getLine();
    if (line !== undefined) {
      const taskMd5 = line.payload.md5;

      const checkColl = db.collection('db-test-check');
      const resData = await checkColl.findOne({ md5: taskMd5 })
      if (resData) {
        console.log('resData=>', resData, 'number', checkMaxTime);
        const options = new CustomHttpOption().setUrl('http://localhost:3000/genQueue');
        options.addParameter('md5', resData.md5);
        options.addParameter('time', resData.time);
        tryPostJson(options);
        // checkQueue.genQueueReport(resData.md5, resData.time, db);

        const resAns = await maxAwait(resData, queue, checkMaxTime, checkColl);
        if (resAns.status === 'close') {
          const leanOne = await actOneData(line);
          console.log(leanOne);
        }
      } else { console.log('empty queue'); }
    }
    // queue.clean();
  }
})