'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Admin() {

}

// Methods

Admin.prototype.clear = () => {
    errors = [];
}

export default Admin;