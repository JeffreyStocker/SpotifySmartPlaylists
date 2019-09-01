const dotEnv = require('dotenv').config();

const koa = require ('koa');
const static = require ('koa-static')
const bodyParser = require('koa-bodyparser');
const qs = require('koa-qs');

const authorize = require('./routes/authorize');
const database = require ('./database/database');
const test = require ('./routes/routeTest');

const app = new koa();
const port = Number(process.env.PORT) || 8080;

qs(app);
app.use (bodyParser());
app.use(static(__dirname + '/../dist'))
app.use(authorize.routes(), authorize.allowedMethods());
app.use(test.routes(), test.allowedMethods());

app.listen(port, () => console.log(`App listening on port ${port}!`))