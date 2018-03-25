"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const history = require("connect-history-api-fallback");
const path = require("path");
var Redis = require('ioredis');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.set('port', port);
const config = require('config-lite')(__dirname);
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", 'text/html; charset=utf-8');
    res.header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
mongoose.connect(config.url).then((result) => {
    console.log('mongoose is connect');
}).catch((error) => {
    console.log(error);
});
new Redis(config.redis);
const index_1 = require("./routes/index");
app.use(index_1.default);
let nuxtConfig = require('../nuxt.config.js');
nuxtConfig.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(nuxtConfig);
if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);
app.use('/static', express.static(path.join(__dirname, '..', 'public')));
app.use(history());
app.listen(port, host);
//# sourceMappingURL=app.js.map