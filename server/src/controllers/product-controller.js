'use struct'

const repository = require('../repositories/product-repository');

// Controllers 
exports.post = async (req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Produto cadastrado com sucesso." });
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };;  
};

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



exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
};

exports.getById = async (req, res, next) => {
    try{
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };     
}
exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
        
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto Atualizado com sucesso!'
        })
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
            message: ' removido com sucesso!'
        })
    } catch(err) {
        res.status(500).send({ 
            message: 'Falha ao processar requisição' 
        });
    };
};