"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIErrorCode;
(function (APIErrorCode) {
    APIErrorCode[APIErrorCode["Unknown"] = 0] = "Unknown";
    APIErrorCode[APIErrorCode["ArgumentsMissing"] = 1001] = "ArgumentsMissing";
    APIErrorCode[APIErrorCode["InvalidArguments"] = 1002] = "InvalidArguments";
    APIErrorCode[APIErrorCode["ArgumentsTooLong"] = 1002] = "ArgumentsTooLong";
    APIErrorCode[APIErrorCode["UserNotExists"] = 2001] = "UserNotExists";
    APIErrorCode[APIErrorCode["MobileNumberUnavailable"] = 2002] = "MobileNumberUnavailable";
    APIErrorCode[APIErrorCode["PasswordMismatch"] = 2003] = "PasswordMismatch";
    APIErrorCode[APIErrorCode["PermissionDenied"] = 2004] = "PermissionDenied";
    APIErrorCode[APIErrorCode["UserNotActivated"] = 2005] = "UserNotActivated";
    APIErrorCode[APIErrorCode["VerifierExpired"] = 2101] = "VerifierExpired";
    APIErrorCode[APIErrorCode["InvalidVerifier"] = 2102] = "InvalidVerifier";
    APIErrorCode[APIErrorCode["InvalidToken"] = 2103] = "InvalidToken";
    APIErrorCode[APIErrorCode["InsufficientPoints"] = 3001] = "InsufficientPoints";
    APIErrorCode[APIErrorCode["NoAvailableTestRoom"] = 3002] = "NoAvailableTestRoom";
    APIErrorCode[APIErrorCode["StudentNotExists"] = 3601] = "StudentNotExists";
    APIErrorCode[APIErrorCode["SellerNotExists"] = 3602] = "SellerNotExists";
    APIErrorCode[APIErrorCode["UserExists"] = 3603] = "UserExists";
    APIErrorCode[APIErrorCode["RecordNotExists"] = 3604] = "RecordNotExists";
    APIErrorCode[APIErrorCode["SMSSendFail"] = 4001] = "SMSSendFail";
    APIErrorCode[APIErrorCode["CourseConflict"] = 5001] = "CourseConflict";
    APIErrorCode[APIErrorCode["AddResourceToQiniuFail"] = 6001] = "AddResourceToQiniuFail";
    APIErrorCode[APIErrorCode["UpdateResourceFromQiniuFail"] = 6002] = "UpdateResourceFromQiniuFail";
    APIErrorCode[APIErrorCode["RemoveResourceFromQiniuFail"] = 6003] = "RemoveResourceFromQiniuFail";
    APIErrorCode[APIErrorCode["ResourceNotExists"] = 6004] = "ResourceNotExists";
    APIErrorCode[APIErrorCode["ResourceExists"] = 6005] = "ResourceExists";
})(APIErrorCode = exports.APIErrorCode || (exports.APIErrorCode = {}));
exports.APIErrorMessage = [];
var UNKNOWN_ERROR = '未知错误';
exports.APIErrorMessage[APIErrorCode.Unknown] = UNKNOWN_ERROR;
exports.APIErrorMessage[APIErrorCode.ArgumentsMissing] = '缺少必要参数';
exports.APIErrorMessage[APIErrorCode.InvalidArguments] = '参数值不被接受';
exports.APIErrorMessage[APIErrorCode.UserNotExists] = '该用户不存在';
exports.APIErrorMessage[APIErrorCode.MobileNumberUnavailable] = '手机号已经被使用';
exports.APIErrorMessage[APIErrorCode.PasswordMismatch] = '密码不匹配';
exports.APIErrorMessage[APIErrorCode.PermissionDenied] = '权限不足';
exports.APIErrorMessage[APIErrorCode.UserNotActivated] = '用户未激活';
exports.APIErrorMessage[APIErrorCode.VerifierExpired] = '验证码已过期';
exports.APIErrorMessage[APIErrorCode.InvalidVerifier] = '验证码错误';
exports.APIErrorMessage[APIErrorCode.InvalidToken] = '识别码错误';
exports.APIErrorMessage[APIErrorCode.InsufficientPoints] = '余额不足';
exports.APIErrorMessage[APIErrorCode.NoAvailableTestRoom] = '没有可用的测试房间';
exports.APIErrorMessage[APIErrorCode.StudentNotExists] = '学生不存在';
exports.APIErrorMessage[APIErrorCode.SellerNotExists] = '教务老师不存在';
exports.APIErrorMessage[APIErrorCode.UserExists] = '用户已存在';
exports.APIErrorMessage[APIErrorCode.RecordNotExists] = '记录不存在';
exports.APIErrorMessage[APIErrorCode.SMSSendFail] = '短信发送失败';
exports.APIErrorMessage[APIErrorCode.CourseConflict] = '课程有冲突';
exports.APIErrorMessage[APIErrorCode.AddResourceToQiniuFail] = '添加资源到七牛失败';
exports.APIErrorMessage[APIErrorCode.UpdateResourceFromQiniuFail] = '更新七牛的资源失败';
exports.APIErrorMessage[APIErrorCode.RemoveResourceFromQiniuFail] = '删除七牛的资源失败';
exports.APIErrorMessage[APIErrorCode.ResourceNotExists] = '资源不存在';
exports.APIErrorMessage[APIErrorCode.ResourceExists] = '资源已存在';
exports.APIErrorMessage[APIErrorCode.ArgumentsTooLong] = '参数太长';
class APIError {
    constructor(code = APIErrorCode.Unknown, message = exports.APIErrorMessage[code] || APIErrorCode[code] || UNKNOWN_ERROR, data, error) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.error = error;
        this.stack = new Error().stack;
        this.name = APIErrorCode[code];
    }
}
exports.APIError = APIError;
//# sourceMappingURL=api-error.js.map