const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
import { Request,Response,NextFunction } from 'express'
import * as history from 'connect-history-api-fallback';
import * as path from 'path';
import { startCreateMenu } from './controller/wechat/index'
// import * as Redis from 'ioredis';
let Redis = require('ioredis')
const { Nuxt, Builder } = require('nuxt')

const app = express();
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = require('config-lite')(__dirname);

app.all('*', (req:Request, res:Response, next:NextFunction) => {
	// const origin = req.headers.origin;
	// res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", 'true'); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	res.header("Content-Type", 'text/html; charset=utf-8')
	res.header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36');
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});
mongoose.connect(config.url).then((result:any) => {
	console.log('mongoose is connect')
}).catch((error:any) => {
	console.log(error)
})

new Redis(config.redis)

// Import API Routes
import router from './routes/index';

router(app);

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(nuxtConfig)

// Build only in dev mode
if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)
// 自定义微信订单
// startCreateMenu()

// app.use('/static',express.static(path.join(__dirname,'..','public')))
// app.use(history());
app.listen(port, host)