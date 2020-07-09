'use strict'

const mongoose = require('mongoose');
const Order = require('../models/Order')

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}

exports.get = async () => {
    const res = await Order.find({}, 'number status')
    .populate('customer', 'name')
    .populate('items.product', 'title');
    return res;
}

exports.getById = async(id) => {
    const res = await Order.findById(id);
    return res;
}