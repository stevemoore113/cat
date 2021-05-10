var mongodb = require('mongodb')
var mongoDbQueue = require('mongodb-queue')

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })
async function wait(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("anything");
    }, ms);
  });
};
client.connect(async (err) => {
  const db = client.db('test')
  /**
   * @param db 
   * @param visibility 資料接收後可被看的秒數，秒數到了會回到等待列表變成可以重新拿出的狀態
   * @param delay 資料傳送時延遲多久才能進入等待列表讓他可以被讀取
   */
  const queue = mongoDbQueue(db, 'my-queue-test', { visibility: 100, delay: 1000 })
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
    await wait(1000);
    size = await getSize();
    if (size[0] === 0) {
      console.log(waitSec);
      waitSec += 1;
      continue;
    }
    waitSec = 0;
    line = await getLine();
    if (line !== undefined) {
      leanOne = await actOneData(line);
      done = await getDone();
      seen = await getFlight();
      total = await getTotal();
      // let deletOne = await cleanOneData();
      console.log(line, done, size, seen, total,);
    }
  }
})