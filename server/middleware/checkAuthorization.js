const userDB = require ('../database/users');

const checkAuth = async function (ctx, next) {
  let user;
  if (ctx.session && ctx.session.id) {
    user = await userDB.getUser({id: ctx.session.id})
      .then(user => {
        return user;
      })
      .catch(err => null);

    ctx.user = user;
  }
  ctx.auth = (((user && user.id) === ctx.session.id) && user) ? true : false;
  await next();
}

module.exports = {
  checkAuth
}


