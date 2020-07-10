'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

// GET
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);

// POST
router.post('/', authService.isAdmin, controller.checkData, controller.post);

// PUT
router.put('/:id', authService.isAdmin, controller.put);

// DELETE
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;