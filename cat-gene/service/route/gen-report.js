var mongodb = require('mongodb')
var mongoDbQueue = require('mongodb-queue')
var md5 = require('md5');

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })
const data = { name: 'steve', time: 5000, status: 'close', md5: '' };
const deadQueue = mongoDbQueue(db, 'deadQueue');
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
   */
  static async genQueueReport(md5, time) {
    const db = client.db('test')
    const coll = db.collection('db-test-check');;
    const resData = await coll.findOne({ md5 });
    if (resData) {
      await wait(time);
      await coll.updateOne({ md5 }, { status: 'close' });
    }
  }
}
module.exports = genReprotController;