const mongodb = require('mongodb')
const mongoDbQueue = require('mongodb-queue')
const Router = require('koa-router');

const md5 = require('md5');

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })
const data = { name: 'steve', time: 5000, status: 'close', md5: '' };

async function wait(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("anything");
    }, ms);
  });
};
class genReprotController {
  /**
   * @param {*} ctx requestbody -> tostring -> md5 ->add DataBase and setting init status and add queue
   * @param {*} next 
   * @param md5 id
   * @param time complete time
   * @param db 需要查詢的資料庫
   */
  static async genQueueReport(ctx, next) {
    const url = 'mongodb://localhost:27017/'
    const client = new mongodb.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
    const md5 = ctx.request.body.md5;
    const time = ctx.request.body.time

    client.connect().then(async (err) => {
      console.log(md5, time);
      const db = client.db('test')
      console.log(md5, time);
      await wait(time);
      const coll = db.collection('db-test-check-uq');
      const resData = await coll.findOne({ md5 });
      const deadQueue = mongoDbQueue(db, 'deadQueue');
      if (resData.isComplete !== true) {
        await coll.updateOne({ md5 }, { $set: { status: 'close', isComplete: true } });
        return;
      }
      else { console.log('done'); return; };
    });

  }
}

const queueGen = new Router();
queueGen.post('/genQueue', genReprotController.genQueueReport);
module.exports = queueGen;