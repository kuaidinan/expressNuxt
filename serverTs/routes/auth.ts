'use strict';
import { Request,Response } from 'express';
import Wechat from '../controller/wechat'

const express = require('express')
const router = express.Router();

router.get('/', new Wechat().requestAuth);

export default router;