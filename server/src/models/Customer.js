'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome de usuário é obrigatório'],
    },
    phone: {
        type: String,
        required: [true, 'O número de telefone é obrigatório'],
        pattern: "^(\\([0-9]{2}\\))?[0-9]{4}-[0-9]{4}$"
    },
    address: {
        type: String,
        required: [true, 'O endereço é obrigatório']
    },
    image: {
        type: Object
    },
    email: {
        type: String,
        pattern: "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi",
        required: [true, 'O email é obrigatório'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A senha de usuário é obrigatória']
    },
    numCard: {
        type: Number
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Customer', schema);