'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const express = require('express');
const router = express.Router();
router.get('/', new index_1.default().requestAuth);
exports.default = router;
//# sourceMappingURL=auth.js.map