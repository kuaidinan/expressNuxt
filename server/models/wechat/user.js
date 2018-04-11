"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const lastModifiedPlugin = require('../core/lastModify');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    openid: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    nickname: String,
    sex: Number,
    language: String,
    city: String,
    province: String,
    country: String,
    headimgurl: String,
    privilege: Array,
    created_at: {
        type: Date,
        "default": Date.now
    },
    lastMod: Date,
});
usersSchema.plugin(lastModifiedPlugin, { index: true });
usersSchema.index({ id: 1 });
const Users = mongoose.model('Users', usersSchema);
exports.default = Users;
//# sourceMappingURL=user.js.map