import { Request, Response, NextFunction } from 'express';
export default class Wechat {
    sign(req: Request, res: Response): Promise<void>;
    signPost(req: Request, res: Response): Promise<void>;
    getMenu(req: Request, res: Response): Promise<void>;
    createMenu(): Promise<{}>;
    requestAuth(req: Request, res: Response): Promise<void>;
    callBack(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAuthPageToken(code: string): Promise<{}>;
    updateAuthPageToken(refreshToken: string): Promise<{}>;
    getUser(accessToken: string, openid: string): Promise<{}>;
    getSignature(req: Request, res: Response): Promise<void>;
}
export declare function startCreateMenu(): Promise<void>;
