var mongodb = require('mongodb')
var mongoDbQueue = require('mongodb-queue')

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })
async function wait(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("anything");
    }, 5000);
  });
};

client.connect(async (err) => {
  const db = client.db('test')
  const queue = mongoDbQueue(db, 'my-queue-test', { visibility: 1, delay: 1 })

  queue.add('1', (err) => {
  })
  await wait(100);
  queue.add('2', (err) => {
  })
  await wait(100);
  queue.add('3', (err) => {
  })
  await wait(100);
  queue.add('4', (err) => {
  })
  await wait(100);
  queue.add('5', (err) => {
  })
  await wait(100);
  queue.add('6', (err) => {
  })
  await wait(100);
  queue.add('7', (err) => {
  })
  await wait(100);
  queue.add('8', (err) => {
  })
  await wait(100);
  queue.add('9', (err) => {
  })

  // await wait(3000);

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
  // await wait(5000);


  // 函数实现，参数单位 毫秒 ；

  // 调用方法；


  // queue.done((err, count) => {
  //   console.log('This queue has processed %d messages', count)
  // })
  // queue.clean((err) => {
  //   console.log('clean')
  // })
  // queue.get((err, msg) => {
  //   queue.ack(msg.ack, (err, id) => {
  //   })
  // })
  // queue.done((err, count) => {
  //   console.log('This queue has processed %d messages', count)
  // })
  // queue.clean((err) => {
  //   console.log('clean')
  // })
})