import Koa from 'koa';
import Router from 'koa-router';
import { bengalRouter } from './route/bengal-route';

const app = new Koa();
const router = new Router();

app.use(bengalRouter.routes());

app.listen(3000);

console.log('Server running on port 3000');