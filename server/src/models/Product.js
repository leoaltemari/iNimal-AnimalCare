'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória']
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'O preço é obrigatório']
    },
    active: {
        type: Boolean,
        required: [true, 'O status é obrigatório'],
        default: true
    },
    quantity: {
        type: Number,
        required: [true, 'A quantidade é obrigatória'],
        default: 1
    },
    image: {
        type: Object
    },
    category: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        trim: true,
        required: true
    },
    tags: [{
        type: String,
        trim: true,
        required: [true, 'Tags são obrigatórias']
    }],
});

module.exports = mongoose.model('Product', schema);