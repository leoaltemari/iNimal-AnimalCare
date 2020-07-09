'use strict'
const mongoose = require('mongoose');
const Customer = require('../models/Customer');


exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.get = async () => {
    const res = await Customer.find();
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.update = async (id, body) => {
    const query = {
    };

    if(body.name) {
        query.name = body.name;
    }
    if(body.phone) {
        query.phone = body.phone;
    }
    if(body.email) {
        query.email = body.email;
    }
    if(body.password) {
        query.password = body.password;
    }
    if(body.address) {
        query.address = body.address;
    }

    const res = await Customer.findByIdAndUpdate(id, query);

    return res;
}

exports.delete = async (id) => {
    const res = await Customer.findOneAndRemove(id);
    return res;
};