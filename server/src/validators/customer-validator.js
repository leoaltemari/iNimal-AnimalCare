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
CustomerValidation.prototype.validate = (data) => {
    // Required validation
    
    validator.isRequired(data.name, 'O campo Nome é obrigatório');
    validator.isRequired(data.email, 'O campo Email é obrigatório');
    validator.isRequired(data.email, 'O campo Telefone é obrigatório');
    validator.isRequired(data.email, 'O campo Endereço é obrigatório');
    validator.isRequired(data.email, 'O campo Senha é obrigatório');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }

    // Name validator
    validator.hasMinLen(data.name, 5, 'O nome deve possuir mínimo de 5 caracteres');
    validator.hasMaxLen(data.name, 20, 'O nome deve possuir máximo de 20 caracteres');
       
    // Email validator
    validator.isEmail(data.email, 'O email deve estar no formato user@domain.com');
    
    // Phone validator
    validator.hasMinLen(data.phone, 11, 'O número de telefone deve estar no formato (dd) 9999-9999');
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

CustomerValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = CustomerValidation;