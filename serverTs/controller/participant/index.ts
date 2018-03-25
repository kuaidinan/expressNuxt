'use strict';

import { Request,Response,NextFunction } from 'express'

// export default class Participant {
//     async getList(req:Request,res:Response) {
//         try{
//             res.send({
//                 text:'123'
//             })
//         }catch(err) {
//             throw new Error(err);
//         }
//     }
// }
export const getList = async function(req:Request,res:Response) {
    try{
        res.send({
            text:'123'
        })
    }catch(err) {
        throw new Error(err);
    }
}
export const test = '123'

export default function hh() {
    console.log(1)
}