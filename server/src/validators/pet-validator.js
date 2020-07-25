'use strict'

const Validator = require('./validator');

// Attributes
let validator;

// Constructor
function PetValidation() {
    validator = new Validator();
    validator.clear();
};


PetValidation.prototype.postValidation = (data) => {
    validator.clear();
    // Required validation
    validator.isRequired(data.owner, 'O campo Proprietário é obrigatório');
    validator.isRequired(data.name, 'O campo Nome é obrigatório');
    validator.isRequired(data.race, 'O campo Raça é obrigatório');
    validator.isRequired(data.age, 'O campo Idade é obrigatório');
    
    // If one of the required fields is not completed
    if(!validator.isValid()) {
        return false;
    }


    // Name validator
    if(data.name) {
        data.name = data.name.replace(/\s+/g, ' '); // replace bouble white spaces from name
        validator.hasMaxLen(data.name, 20, 'O nome deve possuir máximo de 20 caracteres');
    }

    // Race validator
    if(data.race) {
        validator.hasMinLen(data.race, 3, 'A raça deve possuir mínimo de 3 caracteres');
        validator.hasMaxLen(data.race, 30, 'A raça deve possuir máximo de 30 caracteres');
    }

    // Age validator
    if(data.age) {
        validator.isLower(data.age, 1, 'Idade deve ser maior que 0');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
    
}

PetValidation.prototype.putValidation = (data) => {
    validator.clear();
    
    // Name validator
    if(data.name) {
        validator.hasMaxLen(data.name, 50, 'O nome deve possuir máximo de 50 caracteres');
    }

    // Race validator
    if(data.race) {
        validator.hasMinLen(data.race, 3, 'A raça deve possuir mínimo de 3 caracteres');
        validator.hasMaxLen(data.race, 50, 'A raça deve possuir máximo de 50 caracteres');
    }

    if(data.age) {
        validator.isLower(parseInt(data.age), 0, 'A idade deve ser maior que 0');
    }

    if(validator.isValid()) {
        return true;
    }
    
    return false;
    
}

// GetErrors
PetValidation.prototype.errors = () => { 
    return validator.errors(); 
}

module.exports = PetValidation;