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
const Redis = require('ioredis');
const redis = new Redis();
const config = require('config-lite')(__dirname);
const utils_1 = require("../../common/utils");
function getWechatAccessToken() {
    return new Promise((resolve, reject) => {
        utils_1.fetch({
            method: "get",
            url: `${config.wechat.prefix}/token?grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
        }).then((result) => {
            var json;
            json = JSON.parse(result);
            if (!json.access_token || json.errorcode) {
                reject(json);
                return;
            }
            json["timeStamp"] = Date.now();
            resolve(json);
        }).catch((error) => {
            reject(error);
            throw new Error(error);
        });
    });
}
function getAccessToken() {
    return new Promise((resolve, reject) => {
        utils_1.getRedis(config.wechat.token)
            .then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
            throw new Error(error);
        });
    }).then(res => new Promise((resolve, reject) => {
        if (res) {
            resolve(res);
        }
        else {
            getWechatAccessToken().then((res) => {
                utils_1.saveRedis(config.wechat.token, res.access_token, 7100)
                    .then((success) => {
                    resolve(res.access_token);
                }).catch((error) => {
                    reject(error);
                    throw new Error(error);
                });
            }).catch((error) => {
                reject(error);
                throw new Error(error);
            });
        }
    }))
        .catch(error => {
        throw new Error(error);
    });
}
exports.getAccessToken = getAccessToken;
function getTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        let access_token = yield getAccessToken();
        return utils_1.fetch({
            url: `${config.wechat.prefix}/ticket/getticket?access_token=${access_token}&type=jsapi`,
            method: 'get'
        }).then((result) => {
            return Promise.resolve(result);
        }).catch((error) => {
            return Promise.reject(error);
        });
    });
}
function getJSApiTicket() {
    return new Promise((resolve, reject) => {
        utils_1.getRedis('jsapiTicket')
            .then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
            throw new Error(error);
        });
    }).then(res => new Promise((resolve, reject) => {
        if (res) {
            resolve(res);
        }
        else {
            getTicket().then((result) => {
                var json;
                json = JSON.parse(result);
                if (!json.ticket || json.errorcode) {
                    reject(json);
                    return;
                }
                utils_1.saveRedis('jsapiTicket', json.ticket, 7100)
                    .then((success) => {
                    resolve(json.ticket);
                }).catch((error) => {
                    reject(error);
                    throw new Error(error);
                });
            }).catch((error) => {
                reject(error);
                throw new Error(error);
            });
        }
    }))
        .catch(error => {
        throw new Error(error);
    });
}
exports.getJSApiTicket = getJSApiTicket;
//# sourceMappingURL=index.js.map