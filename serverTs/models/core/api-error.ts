export enum APIErrorCode {
    Unknown = 0,

    ArgumentsMissing = 1001,
    InvalidArguments,
    ArgumentsTooLong = 1002,

    UserNotExists = 2001,
    MobileNumberUnavailable,
    PasswordMismatch,
    PermissionDenied,
    UserNotActivated,
    
    VerifierExpired = 2101,
    InvalidVerifier,
    InvalidToken,

    // 业务错误
    InsufficientPoints = 3001,
    NoAvailableTestRoom,

    StudentNotExists = 3601,
    SellerNotExists,
    UserExists,
    RecordNotExists,
    
    SMSSendFail = 4001,
    
    /** 课程冲突 */
    CourseConflict = 5001,
    
    /** 操作七牛 */
    AddResourceToQiniuFail = 6001,
    UpdateResourceFromQiniuFail,
    RemoveResourceFromQiniuFail,
    ResourceNotExists,
    ResourceExists
    
}

export var APIErrorMessage: string[] = [];

var UNKNOWN_ERROR = '未知错误';

APIErrorMessage[APIErrorCode.Unknown]                 = UNKNOWN_ERROR;

APIErrorMessage[APIErrorCode.ArgumentsMissing]        = '缺少必要参数';
APIErrorMessage[APIErrorCode.InvalidArguments]        = '参数值不被接受';

APIErrorMessage[APIErrorCode.UserNotExists]           = '该用户不存在';
APIErrorMessage[APIErrorCode.MobileNumberUnavailable] = '手机号已经被使用';
APIErrorMessage[APIErrorCode.PasswordMismatch]        = '密码不匹配';
APIErrorMessage[APIErrorCode.PermissionDenied]        = '权限不足';
APIErrorMessage[APIErrorCode.UserNotActivated]        = '用户未激活';

APIErrorMessage[APIErrorCode.VerifierExpired]         = '验证码已过期';
APIErrorMessage[APIErrorCode.InvalidVerifier]         = '验证码错误';
APIErrorMessage[APIErrorCode.InvalidToken]            = '识别码错误';

APIErrorMessage[APIErrorCode.InsufficientPoints]      = '余额不足';
APIErrorMessage[APIErrorCode.NoAvailableTestRoom]     = '没有可用的测试房间';

APIErrorMessage[APIErrorCode.StudentNotExists]        = '学生不存在';
APIErrorMessage[APIErrorCode.SellerNotExists]         = '教务老师不存在';
APIErrorMessage[APIErrorCode.UserExists]              = '用户已存在';
APIErrorMessage[APIErrorCode.RecordNotExists]         = '记录不存在';

APIErrorMessage[APIErrorCode.SMSSendFail]             = '短信发送失败';

APIErrorMessage[APIErrorCode.CourseConflict]          = '课程有冲突';

APIErrorMessage[APIErrorCode.AddResourceToQiniuFail]  = '添加资源到七牛失败';
APIErrorMessage[APIErrorCode.UpdateResourceFromQiniuFail] = '更新七牛的资源失败';
APIErrorMessage[APIErrorCode.RemoveResourceFromQiniuFail] = '删除七牛的资源失败';
APIErrorMessage[APIErrorCode.ResourceNotExists]  = '资源不存在';
APIErrorMessage[APIErrorCode.ResourceExists]     = '资源已存在';

APIErrorMessage[APIErrorCode.ArgumentsTooLong]        = '参数太长';

export class APIError {
    name: string;
    stack: string;
    
    constructor(
        public code = APIErrorCode.Unknown,
        public message = APIErrorMessage[code] || APIErrorCode[code] || UNKNOWN_ERROR,
        public data?: any,
        public error?: Error
        ) {
        this.stack = (<any>new Error()).stack;
        this.name = APIErrorCode[code];
    }
}
