'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Customer', schema);