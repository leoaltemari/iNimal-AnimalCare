'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

// GET 
router.get('/', controller.get);
router.get('/customer/:id', controller.getByCustomerId);
router.get('/status/:status', controller.getByStatus)
router.get('/date', controller.getByDate);

// POST
router.post('/', authService.authorize, controller.post);


module.exports = router;