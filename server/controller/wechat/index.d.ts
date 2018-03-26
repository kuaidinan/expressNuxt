import { Request, Response, NextFunction } from 'express';
export default class Wechat {
    getAccessToken(): Promise<{}>;
    sign(req: Request, res: Response): Promise<void>;
    getMenu(req: Request, res: Response): Promise<void>;
    createMenu(): Promise<{}>;
    requestAuth(req: Request, res: Response): Promise<void>;
    callBack(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAuthPageToken(code: string): Promise<{}>;
    updateAuthPageToken(refreshToken: string): Promise<{}>;
    getUser(accessToken: string, openid: string): Promise<{}>;
}
export declare function startCreateMenu(): Promise<void>;
