const Router = require ('@koa/router')
const router = Router();
const {getToken} = require ('../spotify/authorize');
const {getUserData} = require ('./../spotify/userData');
const {createOrUpdateUser} = require ('../database/users');

router.post('/authorize', async function (ctx, next) {
  const code = ctx.request.body.code;
  const tokenData = await getToken(code);
  const {access_token, refresh_token, expires_in} = tokenData;

  const userData= await getUserData(access_token)

  const dbData = await createOrUpdateUser({
    id: userData.id,
    name: userData.display_name,
    accessToken: access_token,
    refreshToken: refresh_token,
    refreshTokenExpires: expires_in,
  })

  await dbData.populate('smartPlaylists')

  ctx.body = {
    id: userData.id,
    name: userData.display_name,
    smartPlaylists: dbData.smartPlaylists,
    accessToken: access_token
  };

  ctx.session = {
    id: userData.id,
    name: userData.display_name,
  }

  return ctx;
})

router.get ('authorize/refresh', async ctx => {
  if (ctx.isAuth) {
    return {
      accessToken: ctx.user.accessToken,
      accessTokenExpire: ctx.user.refreshTokenExpires - (Date.now() - ctx.user.updatedAccessToken),
    }
  }
})

module.exports = router;