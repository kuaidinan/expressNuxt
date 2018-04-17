'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const router = express.Router();
const index_1 = require("../controller/wechat/index");
const wechat = new index_1.default();
router.get('/wechat-token-check', wechat.sign);
router.post('/wechat-token-check', wechat.signPost);
router.get('/getMenu', wechat.getMenu);
router.get('/callBack', wechat.callBack);
router.post('/getSignature', wechat.getSignature);
exports.default = router;
//# sourceMappingURL=wechat.js.map