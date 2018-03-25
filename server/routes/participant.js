'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const ttt = require("../controller/participant/index");
console.log('Participant', ttt);
router.get('/getList', function (req, res, next) {
    res.json(123);
});
exports.default = router;
//# sourceMappingURL=participant.js.map