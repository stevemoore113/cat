const mongodb = require('mongodb')
const mongoDbQueue = require('mongodb-queue')
const Router = require('koa-router');
const md5 = require('md5');


async function wait(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("anything");
    }, ms);
  });
};
async function checkStatus(id) {
}

class addReprotController {
  /**
   * @param {*} ctx requestbody -> tostring -> md5 ->add DataBase and setting init status and add queue
   * @param {*} next 
   */
  static async AddQueueDb(ctx, next) {
    const url = 'mongodb://localhost:27017/'
    const client = new mongodb.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
    const checkMaxTime = 20000 / 1000;
    const visibilityTime = 1; //一秒鐘後進入列隊
    const delayTime = 10; //幾秒後加入列隊
    const data = { taskName: 'steve', time: 5000, status: 'close', md5: '', isComplete: false };
    let checkExist = '';


    data.taskName = ctx.request.body.taskName;
    data.status = 'open';
    data.time = ctx.request.body.time;
    data.md5 = md5(JSON.stringify(data));
    data.isComplete = false;

    console.log('jsondata : ', ctx.request.body);
    console.log('data : ', data);

    await client.connect().then(async (err) => {
      const db = client.db('test')
      const dbo = db.collection('db-test-check');
      const deadQueue = mongoDbQueue(db, 'deadQueue');
      const _option = { visibility: visibilityTime, delay: delayTime, deadQueue: deadQueue };
      const queue = mongoDbQueue(db, 'my-queue-test', _option)
      checkExist = await dbo.findOne({ md5: data.md5 })
      if (checkExist) {
        console.log('重複任務');
        return;
      } else {
        await dbo.insertOne(data);
        await wait(200);
        queue.add(data, (err) => { });
        await wait(200);
      }
    });
    await client.close();
    next();
  }
}

const queueAdd = new Router();
queueAdd.post('/AddQueue', addReprotController.AddQueueDb);
module.exports = queueAdd;
