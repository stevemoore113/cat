var mongodb = require('mongodb')
var mongoDbQueue = require('mongodb-queue')

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })
// function wait(ms) {
//   return new Promise(resolve = > setTimeout(() = > resolve(), ms));
// };

client.connect(err => {
  const db = client.db('test')
  const queue = mongoDbQueue(db, 'my-queue-test', {})

  // queue.add('1', (err) => {
  // })
  // queue.add('2', (err) => {
  // })
  // queue.add('3', (err) => {
  // })

  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })
  queue.get((err, msg) => {
    console.log(msg);
  })



  queue.size((err, count) => {
    console.log('This queue has %d current messages', count)
  })
  queue.inFlight((err, count) => {
    console.log('This queue has %d current messages', count)
  })
  queue.done((err, count) => {
    console.log('This queue has %d current messages', count)
  })
  queue.total((err, count) => {
    console.log('This queue has seen %d messages', count)
  })
})