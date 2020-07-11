'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedule-controller');
const authService = require('../services/auth-service');

// GET 
router.get('/', authService.isAdmin, controller.get);
router.get('/customer/:id', authService.authorize, controller.getByCustomerId);
router.get('/date', authService.authorize, controller.getByDate);

// POST
router.post('/',authService.authorize, controller.checkDayAvaliable, controller.post);

// DELETE
router.delete('/:id', authService.isAdmin ,controller.delete);


module.exports = router;