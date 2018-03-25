import { Request,Response,NextFunction } from 'express'
const users = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' },
  ]
// export function getUser(req:any, res:any, next:any) {
//     res.json(users)
// }
export default class Participant {
    async getUser(req:Request,res:Response) {
        try{
            res.send({
                text:'123'
            })
        }catch(err) {
            throw new Error(err);
        }
    }
}