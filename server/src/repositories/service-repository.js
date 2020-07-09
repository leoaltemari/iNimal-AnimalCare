'use strict'

const mongoose = require('mongoose');
const Service = require('../models/Service');

exports.get = async () => {
    const res = await Service.find();
    return res;
};

exports.getBySlug = async (slug) => {
    const query = { 
        slug: slug,
    };
    const res = await Service
        .findOne(
            query,
            'title description partner price slug tags hours'
        );
    return res;
};

exports.getById = async (id) => {
    const res = await Service.findById(id);
    return res;
};

exports.getByTag = async (tag) => {
    const res = await Service.find({ 
        tags: tag,
    }, 'title description partner price slug tags hours');
    return res;
};

exports.getPartnerHours = async (data) => {
    // Creating a new regular expression
    const regex = new RegExp(data.name , 'i');
    
    // Creating a query for the search
    const query = { 
        partner: { $regex: regex },
        hours: { $in: data.hours}
    };

    const res = await Service.find(query, 'title partner');
    return res;
};

exports.create = async (body) => {
    const service = new Service(body);
    const res = await service.save();
    return res;
};

exports.update = async (id, body) => {
    const res = await Service
        .findByIdAndUpdate(id, {
            $set: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                partner: body.partner,
                price: body.price,
                hours: body.hours,
            }
        });

    return res;
}

exports.delete = async (id) => {
    const res = await Service.findOneAndRemove(id);
    return res;
};