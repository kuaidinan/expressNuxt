'use strict';
import participant from './participant'
import wechat from './wechat'
import auth from '../controller/wechat/auth'

import { Router } from 'express'
import { Express } from 'express'
const router:Router = Router()

export default (app:Express) => {
    // app.use('/auth',auth)
    app.use('/api/participant',participant)
    app.use('/api/wechat',wechat)
}
// router.use(participant)
// router.use(wechat)
// router.use(auth)

// export default router