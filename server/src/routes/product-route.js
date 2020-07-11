'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

// GET
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.get('/admin/:id', controller.getById);


// POST
router.post('/', authService.isAdmin, controller.checkPostData, 
                 controller.uploadImage, controller.post);

// PUT
router.put('/:id', authService.isAdmin, controller.checkPutData, controller.uploadImage, controller.put);

// DELETE
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;