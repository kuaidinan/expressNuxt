import { Request, Response } from 'express';
export declare function sign(req: Request, res: Response): void;
export declare function signJSDK(option: any): any;
export declare function fetch(option: any): Promise<{}>;
export declare function saveRedis(keyName: String, keyValue: any, expireat: Number): Promise<{}>;
export declare function getRedis(keyName: String): Promise<{}>;
export declare function stringToObject(val: string | object): any;
