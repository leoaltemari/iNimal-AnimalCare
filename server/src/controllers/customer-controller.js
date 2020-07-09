'use struct'

const repository = require('../repositories/customer-repository');

// Controllers 
exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: "Cliente cadastrado com sucesso."});
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };;  
};

