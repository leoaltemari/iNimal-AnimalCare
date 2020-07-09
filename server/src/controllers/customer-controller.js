'use struct'

const repository = require('../repositories/customer-repository');
const CustomerValidator = require('../validators/customer-validator');
const multer = require('multer');
const path = require('path');

// Configuring multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage });

exports.uploadImage = upload.single('file');

// Controllers
exports.get = async (req, res,  next) => {
    try{
        const data = await repository.get();
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
};

exports.getById = async (req, res,  next) => {
    try{
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
};

exports.post = async (req, res, next) => {
    try {
        const customerValidator = new CustomerValidator();
        if(customerValidator.postValidation(req.body)) {
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

exports.put = async (req, res, next) => {
    try {
        const customerValidator = new CustomerValidator();
        if(customerValidator.putValidation(req.body)) {
            await repository.update(req.params.id, req.body);
            res.status(200).send({
                message: 'Informações atualizadas com sucesso!'
            });
        } else {
            res.status(200).send(customerValidator.errors());
        }
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Cliente removido com sucesso!'
        })
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
};

