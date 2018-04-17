'use strict';

var express = require('express')
const router = express.Router();

import Wechat from '../controller/wechat/index';
const wechat = new Wechat();

router.get('/wechat-token-check', wechat.sign);
router.post('/wechat-token-check', wechat.signPost);
router.get('/getMenu', wechat.getMenu);
router.get('/callBack', wechat.callBack);
router.post('/getSignature', wechat.getSignature);

export default router;