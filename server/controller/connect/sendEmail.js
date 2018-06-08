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
const emailjs = require('emaijs');
class Connect {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var server = emailjs.server.connect({
                    user: "352789535@qq.com",
                    password: "ibyeupfdfuoocahb",
                    host: "smtp.qq.com",
                    ssl: true
                });
                server.send({
                    text: "邮件内容",
                    from: "352789535@qq.com",
                    to: "1936476416@qq.com",
                    subject: "邮件主题"
                }, function (err, message) {
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
//# sourceMappingURL=sendEmail.js.map