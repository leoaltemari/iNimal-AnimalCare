'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Service() {

}

// Methods

Service.prototype.clear = () => {
    errors = [];
}

export default Service;