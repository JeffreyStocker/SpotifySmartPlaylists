const Router = require ('koa-router')
const router = Router();
const {getToken} = require ('../spotify/authorize');
const {getUserData} = require ('./../spotify/userData');
const {getPlaylists} = require ('./../spotify/playlists');
const User = require ('../database/users');

router.post('/authorize', async function (ctx, next) {
  const code = ctx.request.body.code;
  const token = await getToken(code);
  const accessToken = token.access_token;

  const userData = await getUserData(accessToken);
  const playlists = await getPlaylists(accessToken);
  User.createUser({'test': 'yest'})

  ctx.body = {
    userData,
    playlists
  };
  return ctx;
})

module.exports = router;