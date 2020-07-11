'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

// GET 
router.get('/', authService.isAdmin , controller.get);
router.get('/customer/:id', controller.getByCustomerId);
router.get('/status/:status', authService.isAdmin, controller.getByStatus)
router.get('/date', authService.isAdmin, controller.getByDate);

// POST
router.post('/', authService.authorize, controller.checkStock, controller.post);


module.exports = router;