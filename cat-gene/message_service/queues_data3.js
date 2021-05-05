var mongodb = require('mongodb')
var mongoDbQueue = require('mongodb-queue')

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })


client.connect(err => {
  const db = client.db('test')
  const queue = mongoDbQueue(db, 'my-queue-test', {})

  queue.get((err, msg) => {
    queue.ack(msg.ack, (err, id) => {
    })
  })
  queue.get((err, msg) => {
    queue.ack(msg.ack, (err, id) => {
    })
  })
  queue.get((err, msg) => {
    queue.ack(msg.ack, (err, id) => {
    })
  })

  queue.clean((err) => {
    console.log('clean')
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