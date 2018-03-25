'use strict';
import { Request,Response } from 'express';
const express = require('express')
const router = express.Router();

import * as ttt from '../controller/participant/index';
console.log('Participant',ttt)
// router.get('/getList', Participant.getList);
router.get('/getList', function (req:any, res:any, next:any) {
    res.json(123)
  });

export default router;