'use strict'
const Redis = require('ioredis');
const redis = new Redis();
const config = require('config-lite')(__dirname);

import { Request,Response,NextFunction } from 'express'
import { saveRedis,getRedis,fetch } from '../../common/utils'
import Wechat from '../wechat/index'
import { resolve } from 'path';

// 从微信开放接口获取access_token
function getWechatAccessToken() {
    return new Promise((resolve,reject) => {
        fetch({
            method: "get",
            url: `${config.wechat.prefix}/token?grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
        }).then((result:any) => {
            var json:any;
            
            json = JSON.parse(result);
            if (!json.access_token || json.errorcode) {
                reject(json);
                return;
            }
            json["timeStamp"] = Date.now();
            resolve(json);
        }).catch((error) => {
            reject(error)
            throw new Error(error)
        })
    })
}

// access_token redis缓存处理
export function getAccessToken() {
    return new Promise((resolve,reject) => {
        getRedis(config.wechat.token)
            .then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
    }).then(res => new Promise((resolve,reject) => {
        // redis有值那值 没值请求
        if(res) {
            resolve(res)
        } else {
            getWechatAccessToken().then((res:any) => {
                saveRedis(config.wechat.token,res.access_token,7100)
                    .then((success) => {
                        resolve(res.access_token)
                    }).catch((error:any) => {
                        reject(error)
                        throw new Error(error)
                    })
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
        }
    }))
    .catch(error => {
        throw new Error(error)
    })
}

// 从微信开放接口 获取签名
async function getTicket() {
    let access_token = await getAccessToken()
    return fetch({
        url:`${config.wechat.prefix}/ticket/getticket?access_token=${access_token}&type=jsapi`,
        method:'get'
    }).then((result) => {
        return Promise.resolve(result)
    }).catch((error) => {
        return Promise.reject(error)
    })
}
// 获取jsapi_ticket redis 缓存处理
export function getJSApiTicket() {
    return new Promise((resolve,reject) =>{
        getRedis('jsapiTicket')
            .then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error);
                throw new Error(error)
            })
    }).then(res => new Promise((resolve,reject) => {
        if(res) {
            resolve(res)
        } else {
            getTicket().then((result:any) => {
                var json:any;
            
                json = JSON.parse(result);
                if (!json.ticket || json.errorcode) {
                    reject(json);
                    return;
                }
                saveRedis('jsapiTicket',json.ticket,7100)
                    .then((success) => {
                        resolve(json.ticket)
                    }).catch((error:any) => {
                        reject(error)
                        throw new Error(error)
                    })
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
        }
    }))
    .catch(error => {
        throw new Error(error)
    })
}
