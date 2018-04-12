'use strict';

var express = require('express')
const router = express.Router();

import Wechat from '../controller/wechat/index';
const wechat = new Wechat();

router.get('/sign', wechat.sign);
router.get('/getMenu', wechat.getMenu);
router.get('/callBack', wechat.callBack);
router.post('/getSignature', wechat.getSignature);

export default router;