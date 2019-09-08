const dbUser = require ('../database/users');

const checkToken = async(ctx, next) => {
  let accessToken = null
  if (ctx.auth) {
    const userData = await dbUser.getUser({id: ctx.session.id});
    accessToken = await userData.checkAccessTokenIsExpiredAndUpdate();
  }
  ctx.accessToken = accessToken;
  await next();
}

module.exports = checkToken;