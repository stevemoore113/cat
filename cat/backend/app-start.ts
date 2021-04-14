import Koa from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-body';
import { bengalRouter } from './route/bengal-route';

const app = new Koa();
app.use(KoaBody());
const router = new Router();

app.use(bengalRouter.routes());

app.listen(3000);

console.log('Server running on port 3000');