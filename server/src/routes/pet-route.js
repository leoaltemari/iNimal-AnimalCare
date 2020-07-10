'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pet-controller');
const authService = require('../services/auth-service');

// GET
router.get('/:id', controller.getByOwnerId);
// POST
router.post('/', authService.authorize, controller.checkPostData, 
                 controller.uploadImage, controller.post);

// PUT
router.put('/:id', authService.authorize, controller.checkPutData,
                   controller.put, controller.uploadImage);

// DELETE
router.delete('/', authService.authorize , controller.delete);

module.exports = router;