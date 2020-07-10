'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    owner: {
        type: String,
        required: [true, 'O proprietário é obrigatório'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'O nome de usuário é obrigatório'],
        trim:true
    },
    image: {
        type: Object
    },
    race: {
        type: String,
        required: [true, 'A raça é obrigatória'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'A idade é obrigatória']
    }
});

module.exports = mongoose.model('Pet', schema);