
const Koa = require('koa');
const KoaBody = require('koa-body');
const queueRoute = require('./route/queue-add-router');
const addQueueRoute = require('./route/gen-report');
const app = new Koa();
app.use(KoaBody());
app.use(queueRoute.routes());
app.use(addQueueRoute.routes());
app.listen(3000);
console.log('Server running on port 3000');