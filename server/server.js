const dotEnv = require('dotenv').config();

const koa = require ('koa');
const static = require ('koa-static')
const Router = require ('koa-router');
const path = require ('path')
const bodyParser = require('koa-bodyparser');

const authorize = require('./routes/authorize');
const database = require ('./database/database');

const app = new koa();
const port = Number(process.env.PORT) || 8080;

app.use (bodyParser());
app.use(static(__dirname + '/../dist'))
app.use(authorize.routes(), authorize.allowedMethods());

app.listen(port, () => console.log(`App listening on port ${port}!`))