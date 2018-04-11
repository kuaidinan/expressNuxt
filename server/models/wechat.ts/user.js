"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    openid: String,
    nickname: String,
    sex: Number,
    language: String,
    city: String,
    province: String,
    country: String,
    headimgurl: String,
    privilege: Array,
});
usersSchema.index({ id: 1 });
const Users = mongoose.model('Users', usersSchema);
exports.default = Users;
//# sourceMappingURL=user.js.map