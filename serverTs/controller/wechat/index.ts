'use strict';

import { Request,Response,NextFunction } from 'express';
import * as HttpRequest from "request";
import { sign,fetch,saveRedis,getRedis,stringToObject,signJSDK } from '../../common/utils';
import { getAccessToken,getJSApiTicket } from '../common/index';
import { resolve } from 'path';
import Auth from '../../common/auth';
import Users from '../../models/wechat/user'
const config = require('config-lite')(__dirname);
const auth = new Auth()

export default class Wechat {
    // 微信签名 测试号用
    async sign(req:Request,res:Response) {
        sign(req,res)
    }
    // 获取微信菜单
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
    // 创建微信菜单
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
    // 微信授权
    public async requestAuth(req:Request,res:Response) {
        // 微信回调接口
        const redirectUrl = auth.requestUrl(config.domain + '/api/wechat/callBack')
        res.redirect(redirectUrl)
    }
    // 微信授权回调接口
    async callBack(req:Request,res:Response,next:NextFunction) {
        const wechat = new Wechat();
        let authPageToken:any = await wechat.getAuthPageToken(req.query.code)
        let updateAuthPageTokens:any = await wechat.updateAuthPageToken(stringToObject(authPageToken).refresh_token)
        updateAuthPageTokens = stringToObject(updateAuthPageTokens)
        // console.log('updateAuthPageTokens',updateAuthPageTokens)
        let userinfo = await wechat.getUser(updateAuthPageTokens.access_token,updateAuthPageTokens.openid)
        // console.log('userinfo',userinfo)
        // 微信关注的逻辑处理
        let userinfoObj = stringToObject(userinfo)
        // access_token is invalid or not latest, 重新进入
        if (userinfoObj.errcode === 40001) {
            res.redirect('/');
            return;
        }
        if (userinfoObj.openid) {
            Users.findOne({
                openid:userinfoObj.openid
            }).then((result:any) => {
                if(!result) {
                    // 新用户
                    Users.create(userinfoObj)
                        .then((createResult) => {
                            res.cookie('pingTeam',userinfoObj.openid,{
                                expires:new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
                            })
                            res.redirect('/activity/pingteam')
                        })
                        .catch((err) => {
                            throw new Error(err);
                        })
                } else {
                    // 老用户
                    res.cookie('pingTeam',userinfoObj.openid,{
                        expires:new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
                    })
                    res.redirect('/activity/pingteam')
                }
            }).catch((err) => {
                throw new Error(err);
            })
        }

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
    // 获取JSSDK签名
    async getSignature(req:Request,res:Response) {
        let temp:any = {};
        let url = req.body.href;
        let ticket = await getJSApiTicket();
        let noncestr = Math.random().toString(36).substr(2,15);
        let timestamp = Math.floor(Date.now() / 1000);
        temp = {
            url,
            jsapi_ticket:ticket,
            noncestr,
            timestamp
        }
        let jsapi_ticket = signJSDK(temp);

        let result = {
            timestamp,
            noncestr,
            jsapi_ticket
        };

        res.send(result)
    }
}

/**
 * 创建菜单逻辑
 */
export async function startCreateMenu() {
    const result = await new Wechat().createMenu()
}