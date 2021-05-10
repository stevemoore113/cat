const mongodb = require('mongodb')
const mongoDbQueue = require('mongodb-queue')

const url = 'mongodb://localhost:27017/'
const client = new mongodb.MongoClient(url, { useNewUrlParser: true })


client.connect(err => {
  const db = client.db('test')
  const queue = mongoDbQueue(db, 'my-queue-test', {})
  queue.get((err, msg) => {
    console.log(msg.payload);
  })
})