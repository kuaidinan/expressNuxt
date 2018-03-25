"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const router = express_1.Router();
router.use(users_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map