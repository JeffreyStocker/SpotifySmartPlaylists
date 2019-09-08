//config
const dotEnv = require('dotenv').config();
const SESSION_CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: false, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
//modules
const koa = require ('koa');
const static = require ('koa-static')
const bodyParser = require('koa-bodyparser');
const qs = require('koa-qs');
const session = require ('koa-session');
//database
const database = require ('./database/database');
//reoutes
const authorize = require('./routes/authorize');
const test = require ('./routes/routeTest');
const users = require ('./routes/user.js');
const playlist = require ('./routes/playlist.js');

const app = new koa();
const port = Number(process.env.PORT) || 8080;
app.keys = [process.env.SESSION_KEY || 'Semi Secret Session Key #2315$@$'];


qs(app);
app.use(require('./middleware/simpleTimerLogger'));
app.use(require('./middleware/checkAuthorization').checkAuth);
app.use(session(SESSION_CONFIG, app))
app.use(bodyParser());
// app.use(async (ctx, next) => {
//   await next();
// })
app.use(require('./middleware/checkToken'))
app.use(static(__dirname + '/../dist'))

app.use(authorize.routes(), authorize.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(playlist.routes(), playlist.allowedMethods());
app.use(test.routes(), test.allowedMethods());

app.listen(port, () => console.log(`App listening on port ${port}!`))