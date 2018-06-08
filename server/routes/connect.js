'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const index_1 = require("../controller/connect/index");
router.get('/sendEmail', new index_1.default().sendEmail);
exports.default = router;
//# sourceMappingURL=connect.js.map