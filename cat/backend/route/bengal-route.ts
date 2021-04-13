import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();

const bengalRouter = new Router();
bengalRouter.get('/', async (ctx: { body: string; }, next) => {
  ctx.body = 'index';
});
export { bengalRouter };