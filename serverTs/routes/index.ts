'use strict';
import participant from './participant'
import sendEmail from './connect'
import wechat from './wechat'
import auth from './auth'

import { Router } from 'express'
import { Express } from 'express'
const router:Router = Router()

export default (app:Express) => {
    app.use(auth)
    app.use('/api/connect',sendEmail)
    app.use('/api/participant',participant)
    app.use('/api/wechat',wechat)
}
// router.use(participant)
// router.use(wechat)
// router.use(auth)

// export default router