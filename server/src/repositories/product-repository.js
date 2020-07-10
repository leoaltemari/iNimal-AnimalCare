'use strict'

const mongoose = require('mongoose');
const Product = require('../models/Product');

exports.get = async () => {
    const query = { active: true };
    const res = await Product.find(
        query,
        'name price description price image quantity category'
    );
    return res;
}

exports.getBySlug = async (slug) => {
    const query = { 
        slug: slug,
        active: true 
    };
    const res = await Product
        .findOne(
            query,
            'name price description price image quantity category'
        );
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product.find({ 
        tags: tag,
        active: true
    }, 'title description price slug tags');
    return res;
}

exports.create = async (body) => {
    const product = new Product(body);
    const res = await product.save();
    return res;
}

exports.update = async (id, body) => {
    const res = await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: body.title,
                description: body.description,
                slug: body.slug,
                price: body.price
            }
        });

    return res;
}

exports.delete = async (id) => {
    const res = await Product.findOneAndRemove(id);
    return res;
}