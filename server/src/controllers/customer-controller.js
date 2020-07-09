'use struct'

const repository = require('../repositories/customer-repository');
const CustomerValidator = require('../validators/customer-validator');


// Controllers 
exports.post = async (req, res, next) => {
    try {
        const customerValidator = new CustomerValidator();
        if(customerValidator.validate(req.body)) {
            await repository.create(req.body);
            res.status(201).send({ message: "Cliente cadastrado com sucesso." });
        } else {
            res.status(200).send( customerValidator.errors() );
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            error: err.message
        });
    };;  
};

