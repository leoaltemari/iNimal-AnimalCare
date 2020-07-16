'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function CustomerValidation() {
    validator = new Validator();
    validator.clear();
};

// Methods
CustomerValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.name, 'O campo Nome é obrigatório');
    validator.isRequired(data.email, 'O campo Email é obrigatório');
    validator.isRequired(data.phone, 'O campo Telefone é obrigatório');
    validator.isRequired(data.address, 'O campo Endereço é obrigatório');
    validator.isRequired(data.password, 'O campo Senha é obrigatório');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 5, 'O nome deve possuir mínimo de 5 caracteres');
    validator.hasMaxLen(data.name, 50, 'O nome deve possuir máximo de 50 caracteres');
       
    // Email validator
    validator.isEmail(data.email, 'O email deve estar no formato user@domain.com');
    
    // Phone validator
    validator.hasMinLen(data.phone, 10, 'O número de telefone deve estar no formato (dd) 9999-9999');
    validator.hasMaxLen(data.phone, 12, 'O número de telefone deve estar no formato (dd) 9999-9999');

    // Password validator
    validator.validPassword(data.password, 'Senha deve possuir de 8 a 32 caracteres, um número e uma letra e um caracter especiaal(!,@,#,etc.)');

    // Address validator
    validator.hasMinLen(data.address, 10, 'O endereço deve possuir no mínimo 10 caracteres');

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

CustomerValidation.prototype.putValidation = (data) => {
    validator.clear();

    // Name validator
    if(data.name) {
        validator.hasMinLen(data.name, 5, 'O nome deve possuir mínimo de 5 caracteres');
        validator.hasMaxLen(data.name, 50, 'O nome deve possuir máximo de 50 caracteres');
    }

    // Email validator
    if(data.email) {
        validator.isEmail(data.email, 'O email deve estar no formato user@domain.com');
    }

    // Phone validator
    if(data.phone) {
        validator.hasMinLen(data.phone, 10, 'O número de telefone deve estar no formato (dd) 9999-9999');
        validator.hasMaxLen(data.phone, 12, 'O número de telefone deve estar no formato (dd) 9999-9999');
    }

    // Password validator
    if(data.password) {
        validator.validPassword(data.password, 'Senha deve possuir de 8 a 32 caracteres, um número e uma letra e um caracter especiaal(!,@,#,etc.)');
    }

    // Address validator
    if(data.address) {
        validator.hasMinLen(data.address, 10, 'O endereço deve possuir no mínimo 10 caracteres');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
}

// GetErrors
CustomerValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = CustomerValidation;