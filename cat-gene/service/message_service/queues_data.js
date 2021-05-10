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
  const queue = mongoDbQueue(db, 'my-queue-test', { visibility: 1, delay: 10 })

  queue.add('A', (err) => {
  })
  await wait(100);
  queue.add('B', (err) => {
  })
  await wait(100);
  queue.add('C', (err) => {
  })
  await wait(100);
  queue.add('D', (err) => {
  })
  await wait(100);
  queue.add('E', (err) => {
  })

  await wait(3000);

  queue.size((err, count) => {
    console.log('This queue has %d current messages', count)
  })
  queue.inFlight((err, count) => {
    console.log('This queue has %d current messages', count)
  })
  queue.done((err, count) => {
    console.log('This queue has %d current messages(done)', count)
  })
  queue.total((err, count) => {
    console.log('total This queue has seen %d messages', count)
  })
})