export declare enum APIErrorCode {
    Unknown = 0,
    ArgumentsMissing = 1001,
    InvalidArguments = 1002,
    ArgumentsTooLong = 1002,
    UserNotExists = 2001,
    MobileNumberUnavailable = 2002,
    PasswordMismatch = 2003,
    PermissionDenied = 2004,
    UserNotActivated = 2005,
    VerifierExpired = 2101,
    InvalidVerifier = 2102,
    InvalidToken = 2103,
    InsufficientPoints = 3001,
    NoAvailableTestRoom = 3002,
    StudentNotExists = 3601,
    SellerNotExists = 3602,
    UserExists = 3603,
    RecordNotExists = 3604,
    SMSSendFail = 4001,
    CourseConflict = 5001,
    AddResourceToQiniuFail = 6001,
    UpdateResourceFromQiniuFail = 6002,
    RemoveResourceFromQiniuFail = 6003,
    ResourceNotExists = 6004,
    ResourceExists = 6005,
}
export declare var APIErrorMessage: string[];
export declare class APIError {
    code: APIErrorCode;
    message: string;
    data: any;
    error: Error | undefined;
    name: string;
    stack: string;
    constructor(code?: APIErrorCode, message?: string, data?: any, error?: Error | undefined);
}
