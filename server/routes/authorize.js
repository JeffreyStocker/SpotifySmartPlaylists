const Router = require ('koa-router')
const router = Router();
const {getToken} = require ('../spotify/authorize');
const {getUserData} = require ('./../spotify/userData');
const {getPlaylists} = require ('./../spotify/playlists');
const {createOrUpdateUser} = require ('../database/users');

router.post('/authorize', async function (ctx, next) {
  const code = ctx.request.body.code;
  const tokenData = await getToken(code);
  const {access_token, refresh_token} = tokenData;

  const [userData, playlists] = await Promise.all ([await getUserData(access_token), await getPlaylists(access_token)])

  const results = await createOrUpdateUser({
    id: userData.id,
    name: userData.display_name,
    accessToken: access_token,
    refreshToken: refresh_token
  })

  ctx.body = {
    userData,
    playlists
  };

  return ctx;
})

module.exports = router;