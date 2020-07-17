'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function ProductValidation() {
    validator = new Validator();
    validator.clear();
};

// Methods

// Validation to make a POST
ProductValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.name, 'O campo Nome é obrigatório');
    validator.isRequired(data.slug, 'O campo Slug é obrigatório');
    validator.isRequired(data.description, 'O campo Descrição é obrigatório');
    validator.isRequired(data.price, 'O campo Preço é obrigatório');
    validator.isRequired(data.quantity, 'O campo Quantidade é obrigatório');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 5, 'O nome deve possuir mínimo de 5 caracteres');
    validator.hasMaxLen(data.name, 50, 'O nome deve possuir máximo de 50 caracteres');
       
    // Slug validator
    validator.contains(data.slug, " ", 'O slug nao deve conter espacos');
    
    // Description validator
    validator.hasMinLen(data.description, 10, 'Descriçãodeve conter no mínimo 10 letras');
    validator.hasMaxLen(data.description, 500, 'Descrição deve conter no máximo 500 letras');

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// Validation to make a PUT
ProductValidation.prototype.putValidation = (data) => {
    validator.clear();
    // Check name
    if(data.name) {
        validator.hasMinLen(data.name, 5, 'O nome deve possuir mínimo de 5 caracteres');
        validator.hasMaxLen(data.name, 50, 'O nome deve possuir máximo de 50 caracteres');
    }
    // Check price
    if(data.price) {
        validator.isRequired(data.price, 'Preço deve ser maior que 0');
    }

    // Check description
    if(data.description) {
        validator.hasMinLen(data.description, 10, 'Descriçãodeve conter no mínimo 10 letras');
        validator.hasMaxLen(data.description, 400, 'Descrição deve conter no máximo 400 letras');
    }
    // Check quantity
    if(data.quantity) {
        validator.isRequired(data.quantity, 'Quantidade deve ser maior que 0');
    }

    // Check slug
    if(data.slug) {
        validator.contains(data.slug, " ", 'O slug nao deve conter espacos');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// GetErrors
ProductValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = ProductValidation;