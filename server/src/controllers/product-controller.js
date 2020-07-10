'use struct'

const repository = require('../repositories/product-repository');
const ProductValidator = require('../validators/product-validator');
const multer = require('multer');
const path = require('path');

// Configuring multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/products');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage });
exports.uploadImage = upload.single('file');

// Controllers 
exports.checkPostData = async (req, res, next)  => {
    const productValidator = new ProductValidator();
    if(!productValidator.postValidation(req.body)){
        res.status(200).send( productValidator.errors() );
    } else {
        next();
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Produto cadastrado com sucesso." });
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };;  
};

exports.get = async (req, res,  next) => {
    try {
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



exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };
};

exports.getById = async (req, res, next) => {
    try{
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };     
}
exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };
};

exports.checkPutData = async (req, res, next) => {
    const productValidator = new ProductValidator();
    if(!productValidator.putValidation(req.body)) {
        res.status(200).send( productValidator.errors() );
    } else {
        next();
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body, req.file);
        res.status(200).send({
            message: 'Produto Atualizado com sucesso!'
        })
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        })
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição',
            err: err.message,
            code: err.code
        });
    };
};