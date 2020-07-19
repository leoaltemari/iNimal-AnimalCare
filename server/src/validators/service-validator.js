'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function ServiceValidation() {
    validator = new Validator();
    validator.clear();
};

// Methods

// Validation to make a POST
ServiceValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.name, 'O campo Nome é obrigatório');
    validator.isRequired(data.description, 'O campo Descrição é obrigatório');
    validator.isRequired(data.partner, 'O campo Profissional é obrigatório');
    validator.isRequired(data.price, 'O campo Preço é obrigatório');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 4, 'O nome deve possuir mínimo de 4 caracteres');
    validator.hasMaxLen(data.name, 20, 'O nome deve possuir máximo de 20 caracteres');
    
    // Description validator
    validator.hasMinLen(data.description, 50, 'A Descriçãodeve conter no mínimo 50 letras');
    validator.hasMaxLen(data.description, 200, 'A Descrição deve conter no máximo 200 letras');

    // Partner validator
    validator.hasMinLen(data.partner, 10, 'O nome do Profissional deve conter no mínimo 10 letras');
    validator.hasMaxLen(data.partner, 30, 'O nome do Profissional deve conter no máximo 30 letras');

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// Validation to make a PUT
ServiceValidation.prototype.putValidation = (data) => {
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
        validator.hasMinLen(data.description, 10, 'Descrição deve conter no mínimo 10 letras');
        validator.hasMaxLen(data.description, 50, 'Descrição deve conter no máximo 50 letras');
    }

    // Check partner
    if(data.partner) {
        validator.hasMinLen(data.partner, 10, 'O nome do Profissional deve conter no mínimo 10 letras');
        validator.hasMaxLen(data.partner, 30, 'O nome do Profissional deve conter no máximo 30 letras');
    }
    
    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// GetErrors
ServiceValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = ServiceValidation;