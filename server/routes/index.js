'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const participant_1 = require("./participant");
const express_1 = require("express");
const router = express_1.Router();
console.log('participant222', participant_1.default);
router.use(participant_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map