
const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-router');
const queueRoute = require('./route/queue-add-router');
const app = new Koa();
app.use(KoaBody());
const router = new Router();
app.use(queueRoute.routes());
app.listen(3000);
console.log('Server running on port 3000');