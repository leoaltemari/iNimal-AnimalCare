'use strict'

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.post = async (req, res, next) => {
    let data = {
        customer: req.body.customer,
        number:  guid.raw().substring(0, 6),
        items: req.body.items
    };

    try {
        await repository.create(data);
        res.status(200).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    }
};

exports.get = async (req, res,  next) => {
    try{
        const data = await repository.get();
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };
};