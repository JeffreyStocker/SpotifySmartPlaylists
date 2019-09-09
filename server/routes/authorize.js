const Router = require ('@koa/router')
const router = Router();
const {getToken} = require ('../spotify/authorize');
const {getUserData} = require ('./../spotify/userData');
const {getPlaylists} = require ('./../spotify/playlists');
const {createOrUpdateUser} = require ('../database/users');

router.post('/authorize', async function (ctx, next) {
  const code = ctx.request.body.code;
  const tokenData = await getToken(code);
  const {access_token, refresh_token, expires_in} = tokenData;

  const userData= await getUserData(access_token)

  const results = await createOrUpdateUser({
    id: userData.id,
    name: userData.display_name,
    accessToken: access_token,
    refreshToken: refresh_token,
    refreshTokenExpires: expires_in,
  })

  ctx.body = {
    id: userData.id,
    name: userData.display_name
  };

  ctx.session = {
    id: userData.id,
    name: userData.display_name
  }

  return ctx;
})

module.exports = router;