var mongodb = require('mongodb')
var mongoDbQueue = require('mongodb-queue')
var Router = require('koa-router');
var md5 = require('md5');

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
async function checkStatus(id) {
}

class addReprotController {
  /**
   * @param {*} ctx requestbody -> tostring -> md5 ->add DataBase and setting init status and add queue
   * @param {*} next 
   */
  static async AddQueueDb(ctx, next) {

    data.name = ctx.request.body.name;
    data.status = 'open';
    data.time = ctx.request.body.time;
    data.md5 = md5(JSON.stringify(md5));

    client.connect(async (err) => {
      const db = client.db('test')
      const dbo = db.collection('db-test-check');;
      const resCheck = await dbo.findOne({ md5: data.md5 }).lean()
      if (resCheck) {
        return;
      } else {
        data = data.md5 = md5(JSON.stringify(data));
        dbo.insertOne(data);
        await wait(100);
      }
      client.close();
    })
    client.connect(async (err, ctx) => {
      const db = client.db('test')
      var deadQueue = mongoDbQueue(db, 'deadQueue');
      const queue = mongoDbQueue(db, 'my-queue-test', { visibility: 1, delay: 10, deadQueue: deadQueue })
      queue.add(data, (err) => { });
      await wait(100);
      client.close();
    })
    next();
  }
}

const queueAdd = new Router();
queueAdd.post('/AddQueue', addReprotController.AddQueueDb);
export { queueAddRouter };
