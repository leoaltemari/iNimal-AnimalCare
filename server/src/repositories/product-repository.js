'use strict'

const mongoose = require('mongoose');
const Product = require('../models/Product');
const fs = require('fs');

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
            'name description price image quantity category'
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
    }, 'name description price image quantity category');
    return res;
}

exports.create = async (body) => {
    const product = new Product(body);
    const res = await product.save();
    return res;
}

exports.update = async (id, body, file) => {
    const query = {
    };

    if(body.name) {
        query.name = body.name;
    }
    if(body.description) {
        query.description = body.description;
    }
    if(body.price) {
        query.price = body.price;
    }
    if(body.quantity) {
        query.quantity = body.quantity;
    }
    if(body.tags) {
        query.tags = body.tags;
    }
    if(body.slug) {
        query.slug = body.slug;
    }

    // Updating image if there is one
    if(file) {
        let imageId = file.filename;
        query.image = { id: imageId, url: `src/public/uploads/products/${imageId}`};
        const product = await Product.findById(id, 'image');
        
        // Remove the old image from the upload folder
        if(product.image) {
            const path = product.image.url;
            fs.unlinkSync(path);
        }
    }

    const res = await Product.findByIdAndUpdate(id, query);

    return res;
}

exports.delete = async (id) => {
    const res = await Product.findOneAndRemove(id);
    return res;
}