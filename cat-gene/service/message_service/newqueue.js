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

client.connect(err => {
  const db = client.db('test')
  let queue = mongoDbQueue(db, 'my-queue-test', {})
  const outString = true;
  queue.get((err, msg) => { console.log(msg) })
  console.log('end');
})