'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');


// GET
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);

// POST
router.post('/', controller.post);

// PUT
router.put('/:id', controller.put);

// DELETE
router.delete('/', controller.delete);

module.exports = router;