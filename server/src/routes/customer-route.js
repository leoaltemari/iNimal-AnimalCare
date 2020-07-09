'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');


// GET
router.get('/', controller.get);
router.get('/:id', controller.getById);

// POST
router.post('/', controller.post);

// PUT
router.put('/:id', controller.uploadImage, controller.put);

// DELETE
router.delete('/', controller.delete);

module.exports = router;