const dotEnv = require('dotenv').config();
const express = require ('express');

const authorize = require('./spotify/authorize');

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.static('/dist'));

app.route('/authorize', authorize)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))