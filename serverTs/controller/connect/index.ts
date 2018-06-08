'use strict';

import { Request,Response,NextFunction } from 'express'
const path = require('path')
const emailjs = require('emailjs')
export default class Connect {
  async sendEmail(req:Request,res:Response) {
    try {
      let server  = emailjs.server.connect({
        user:    "352789535@qq.com",      // 你的QQ用户
        password:"ibyeupfdfuoocahb",           // 注意，不是QQ密码，而是刚才生成的授权码
        host:    "smtp.qq.com",         // 主机，不改
        // ssl:		true,
        tls: {ciphers: "SSLv3"}
      });
      let message = {
          text:    "邮件内容",       //邮件内容
          from:    "352789535@qq.com",        //谁发送的
          to:      "1936476416@qq.com",       //发送给谁的
          subject: "邮件主题",          //邮件主题
          attachment: 
          [
            {data: "<html>i <i>hope</i> this works! here is an image: <img src='cid:my-image' width='100' height ='50'> </html>", alternative:true},
            {path:path.join(__dirname,'../../../assets/img/123.rar'), type:"application/rar", name:"renamed.rar"},
            {path:path.join(__dirname,'../../../assets/img/poster1.jpg'), type:"image/jpg", headers:{"Content-ID":"<my-image>"}}
          ]
      }
    
      //开始发送邮件
      server.send(message, function(err:any, message:any) {
          //回调函数
          if(err) {
            console.log(err)
            res.send({text:'邮件返回失败'})
          }
          res.send({text:'邮件返回成功'})
          console.log(err || message);
      });
    } catch(err) {
      throw new Error(err)
    }
  }
}