import { Request, Response } from 'express';
export default class Connect {
    sendEmail(req: Request, res: Response): Promise<void>;
}
