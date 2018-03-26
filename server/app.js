"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
var Redis = require('ioredis');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.set('port', port);
const config = require('config-lite')(__dirname);
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
//# sourceMappingURL=app.js.map