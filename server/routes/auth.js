'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const wechat_1 = require("../controller/wechat");
const express = require('express');
const router = express.Router();
router.get('/', new wechat_1.default().requestAuth);
exports.default = router;
//# sourceMappingURL=auth.js.map