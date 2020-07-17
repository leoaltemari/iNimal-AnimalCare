'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Product() {

}

// Methods

Product.prototype.clear = () => {
    errors = [];
}

export default Product;