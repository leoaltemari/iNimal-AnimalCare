'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

// GET
router.get('/authenticate', controller.authenticate);
router.get('/:id', controller.getById);

// POST
router.post('/', controller.post);

// PUT
router.put('/:id', controller.uploadImage, controller.put);
router.put('/admin/:value', controller.putAdmin);

// DELETE
router.delete('/', authService.isAdmin ,controller.delete);

module.exports = router;