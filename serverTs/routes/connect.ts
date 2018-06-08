'use strict';
const express = require('express')
const router = express.Router();

import Connect from '../controller/connect/index';
router.get('/sendEmail', new Connect().sendEmail);

export default router;