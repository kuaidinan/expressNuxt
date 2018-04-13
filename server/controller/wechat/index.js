'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const index_1 = require("../common/index");
const auth_1 = require("../../common/auth");
const user_1 = require("../../models/wechat/user");
const config = require('config-lite')(__dirname);
const auth = new auth_1.default();
class Wechat {
    sign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.sign(req, res);
        });
    }
    getMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield index_1.getAccessToken();
            utils_1.fetch({
                method: 'get',
                url: `${config.wechat.prefix}/menu/get?access_token=${token}`
            }).then((result) => {
                res.send(result);
                return Promise.resolve(result);
            }).catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    createMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield index_1.getAccessToken();
            return utils_1.fetch({
                method: 'post',
                url: `${config.wechat.prefix}/menu/create?access_token=${token}`,
                json: true,
                body: config.wechatMenu
            }).then((result) => {
                return Promise.resolve(result);
            }).catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    requestAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const redirectUrl = auth.requestUrl(config.domain + '/api/wechat/callBack');
            res.redirect(redirectUrl);
        });
    }
    callBack(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const wechat = new Wechat();
            let authPageToken = yield wechat.getAuthPageToken(req.query.code);
            let updateAuthPageTokens = yield wechat.updateAuthPageToken(utils_1.stringToObject(authPageToken).refresh_token);
            updateAuthPageTokens = utils_1.stringToObject(updateAuthPageTokens);
            let userinfo = yield wechat.getUser(updateAuthPageTokens.access_token, updateAuthPageTokens.openid);
            let userinfoObj = utils_1.stringToObject(userinfo);
            if (userinfoObj.errcode === 40001) {
                res.redirect('/');
                return;
            }
            if (userinfoObj.openid) {
                user_1.default.findOne({
                    openid: userinfoObj.openid
                }).then((result) => {
                    if (!result) {
                        user_1.default.create(userinfoObj)
                            .then((createResult) => {
                            res.cookie('pingTeam', userinfoObj.openid, {
                                expires: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
                            });
                            res.redirect('/activity/pingteam');
                        })
                            .catch((err) => {
                            throw new Error(err);
                        });
                    }
                    else {
                        res.cookie('pingTeam', userinfoObj.openid, {
                            expires: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
                        });
                        res.redirect('/activity/pingteam');
                    }
                }).catch((err) => {
                    throw new Error(err);
                });
            }
        });
    }
    getAuthPageToken(code) {
        return new Promise((resolve, reject) => {
            utils_1.fetch({
                url: `${config.wechat.prefixApi}/sns/oauth2/access_token?appid=${config.wechat.appID}&secret=${config.wechat.appSecret}&code=${code}&grant_type=authorization_code`,
                method: 'get'
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    updateAuthPageToken(refreshToken) {
        return new Promise((resolve, reject) => {
            utils_1.fetch({
                url: `${config.wechat.prefixApi}/sns/oauth2/refresh_token?appid=${config.wechat.appID}&grant_type=refresh_token&refresh_token=${refreshToken}`,
                method: 'get'
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    getUser(accessToken, openid) {
        return __awaiter(this, void 0, void 0, function* () {
            return utils_1.fetch({
                url: `${config.wechat.prefixApi}/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`,
                method: 'get'
            }).then((result) => {
                return Promise.resolve(result);
            }).catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    getSignature(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = {};
            let url = req.body.href;
            let ticket = yield index_1.getJSApiTicket();
            let noncestr = Math.random().toString(36).substr(2, 15);
            let timestamp = Math.floor(Date.now() / 1000);
            temp = {
                url,
                jsapi_ticket: ticket,
                noncestr,
                timestamp
            };
            let jsapi_ticket = utils_1.signJSDK(temp);
            let result = {
                timestamp,
                noncestr,
                jsapi_ticket
            };
            res.send(result);
        });
    }
}
exports.default = Wechat;
function startCreateMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield new Wechat().createMenu();
    });
}
exports.startCreateMenu = startCreateMenu;
//# sourceMappingURL=index.js.map