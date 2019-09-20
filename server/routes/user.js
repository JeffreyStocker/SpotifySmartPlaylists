const Router = require ('@koa/router');

const route = Router({
  prefix: '/user/:user'
});

const checkAuth = async (user, ctx, next) => {
  // const {user} = ctx.params;
  if (!ctx.auth || user !== ctx.user.id) {
    ctx.status = 400;
    return;
  }
  await next();
}

route.param('user', checkAuth)

route.get('/', async ctx => {
  ctx.body = {
    id: ctx.user.id,
    name: ctx.user.name,
    smartPlaylists: ctx.user.smartPlaylists,
    accessToken: ctx.user.accessToken,
    accessTokenExpire: ctx.user.refreshTokenExpires
  }
})


route.get("/smartplaylist", async ctx => {
  const userCombined = await ctx.user.populate('smartPlaylists');

  ctx.body = {
    smartPlaylists: userCombined.smartPlaylists
  }
  return;
})

route.post("/smartplaylist", async ctx => {
  const playlist = ctx.user.smartPlaylists.create({});
  await ctx.user.smartPlaylists.push(playlist);
  await ctx.user.save();
  ctx.body = playlist

})

route.get("/smartplaylist/:playlist", async ctx => {
  const {playlist} = ctx.params;
  const doc = ctx.user.smartPlaylists.id(playlist);
  ctx.body = doc
})

route.delete("/smartplaylist/:playlist", async ctx => {
  try {
    const {playlist} = ctx.params;
    const doc = ctx.user.smartPlaylists.id(playlist).remove();
    await ctx.user.save();
    ctx.status = 200;
  } catch (err) {
    ctx.status = 400;
  }
})

route.put("/smartplaylist/:playlist", async ctx => {
  const {playlist} = ctx.params;
  const doc = ctx.user.smartPlaylists.id(playlist);
  ctx.body && ctx.body.playist && Object.assign(doc, ctx.body.playlist);
  ctx.user.save();
})

module.exports = route;