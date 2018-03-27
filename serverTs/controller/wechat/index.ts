'use strict';

import { Request,Response,NextFunction } from 'express';
import * as HttpRequest from "request";
import { sign,fetch,saveRedis,getRedis,stringToObject } from '../../common/utils';
import { getAccessToken } from '../common/index';
import { resolve } from 'path';
import Auth from '../../common/auth'
const iconv = require('iconv-lite');
const sha1 = require('sha1'); 
const config = require('config-lite')(__dirname);
const auth = new Auth()

export default class Wechat {
    getAccessToken() {
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
    async sign(req:Request,res:Response) {
        sign(req,res)
    }
    public async getMenu(req:Request,res:Response) {
        const token = await getAccessToken()
        fetch({
            method:'get',
            url:`${config.wechat.prefix}/menu/get?access_token=${token}`
        }).then((result:any) => {
            res.send(result)
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
    public async createMenu() {
        const token = await getAccessToken()
        return fetch({
            method:'post',
            url:`${config.wechat.prefix}/menu/create?access_token=${token}`,
            json:true,
            body: config.wechatMenu
        }).then((result) => {
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
    public async requestAuth(req:Request,res:Response) {
        const redirectUrl = auth.requestUrl(config.domain + '/api/wechat/callBack')
        res.redirect(redirectUrl)
    }
    async callBack(req:Request,res:Response,next:NextFunction) {
        const wechat = new Wechat();
        let authPageToken:any = await wechat.getAuthPageToken(req.query.code)
        let updateAuthPageTokens:any = await wechat.updateAuthPageToken(stringToObject(authPageToken).refresh_token)
        updateAuthPageTokens = stringToObject(updateAuthPageTokens)
        console.log('updateAuthPageTokens',updateAuthPageTokens)
        let userinfo = await wechat.getUser(updateAuthPageTokens.access_token,updateAuthPageTokens.openid)
        console.log('userinfo',userinfo)
        res.send('成功')
    }
    // 获取openId和网页授权token
    getAuthPageToken(code:string) {
        return new Promise((resolve,reject) => {
            fetch({
                url:`${config.wechat.prefixApi}/sns/oauth2/access_token?appid=${config.wechat.appID}&secret=${config.wechat.appSecret}&code=${code}&grant_type=authorization_code`,
                method:'get'
            }).then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
        }) 
    }
    // 刷新网页授权token
    updateAuthPageToken(refreshToken:string) {
        console.log('refreshToken',refreshToken)
        return new Promise((resolve,reject) => {
            fetch({
                url:`${config.wechat.prefixApi}/sns/oauth2/refresh_token?appid=${config.wechat.appID}&grant_type=refresh_token&refresh_token=${refreshToken}`,
                method:'get'
            }).then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    // 获取用户信息
    public async getUser(accessToken:string,openid:string) {
        return fetch({
            url:`${config.wechat.prefixApi}/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`,
            method:'get'
        }).then((result) => {
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

/**
 * 创建菜单逻辑
 */
export async function startCreateMenu() {
    const result = await new Wechat().createMenu()
}