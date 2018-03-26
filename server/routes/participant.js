'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const index_1 = require("../controller/participant/index");
router.get('/getList', new index_1.default().getList);
exports.default = router;
//# sourceMappingURL=participant.js.map