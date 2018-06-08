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
const path = require('path');
const emailjs = require('emailjs');
class Connect {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let server = emailjs.server.connect({
                    user: "352789535@qq.com",
                    password: "ibyeupfdfuoocahb",
                    host: "smtp.qq.com",
                    tls: { ciphers: "SSLv3" }
                });
                let message = {
                    text: "邮件内容",
                    from: "352789535@qq.com",
                    to: "1936476416@qq.com",
                    subject: "邮件主题",
                    attachment: [
                        { data: "<html>i <i>hope</i> this works! here is an image: <img src='cid:my-image' width='100' height ='50'> </html>", alternative: true },
                        { path: path.join(__dirname, '../../../assets/img/123.rar'), type: "application/rar", name: "renamed.rar" },
                        { path: path.join(__dirname, '../../../assets/img/poster1.jpg'), type: "image/jpg", headers: { "Content-ID": "<my-image>" } }
                    ]
                };
                server.send(message, function (err, message) {
                    if (err) {
                        console.log(err);
                        res.send({ text: '邮件返回失败' });
                    }
                    res.send({ text: '邮件返回成功' });
                    console.log(err || message);
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = Connect;
//# sourceMappingURL=index.js.map