"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
let Redis = require('ioredis');
const { Nuxt, Builder } = require('nuxt');
const config = require('config-lite')(__dirname);
const app = express();
const host = config.host || '127.0.0.1';
const port = config.port || 3000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/xml' }));
app.use(bodyParser.urlencoded({ extended: false }));
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
index_1.default(app);
let nuxtConfig = require('../nuxt.config.js');
nuxtConfig.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(nuxtConfig);
if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    builder.build();
}
app.use(nuxt.render);
app.listen(port, host);
console.log(`my server is start,${host}:${port}`);
//# sourceMappingURL=app.js.map