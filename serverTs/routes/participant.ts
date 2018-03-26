'use strict';
import { Request,Response } from 'express';
const express = require('express')
const router = express.Router();

import Participant from '../controller/participant/index';
router.get('/getList', new Participant().getList);

export default router;