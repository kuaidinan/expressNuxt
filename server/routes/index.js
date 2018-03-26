'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const participant_1 = require("./participant");
const wechat_1 = require("./wechat");
const auth_1 = require("./auth");
const express_1 = require("express");
const router = express_1.Router();
exports.default = (app) => {
    app.use(auth_1.default);
    app.use('/api/participant', participant_1.default);
    app.use('/api/wechat', wechat_1.default);
};
//# sourceMappingURL=index.js.map