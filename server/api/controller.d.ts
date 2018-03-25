import { Request, Response } from 'express';
export default class Participant {
    getUser(req: Request, res: Response): Promise<void>;
}
