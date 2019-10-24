const Router = require ('@koa/router');

const route = new Router ({
  prefix: '/logout/:user'
});

const checkAuth = async (user, ctx, next) => {
  if (!ctx.auth || user !== ctx.user.id) {
    ctx.status = 400;
    return;
  }
  await next();
}

route.param('user', checkAuth);

route.get('/', async (ctx) => {
  ctx.session = null;
  ctx.status = 200;
});

module.exports = route