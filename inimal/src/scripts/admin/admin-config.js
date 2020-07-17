'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Admin() {

}

// Methods
Admin.prototype.putAdmin = async (userEmail, userToken) => {
    let res = {};
    try {
        const url = `http://localhost:8081/customers/admin/${userToken}`
        const data = {
            email: userEmail,
        };

        await axios.put(url, data)
        .then(response => {
            res.data = response.data;
        });
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.postProduct = async (product, userToken) => {
    let res = {};
    try {
        const url = `http://localhost:8081/products`;
        const data = product;
        data.token = userToken;

        await axios.post(url, data)
        .then(response => {
            if(response.data.message) {
                res.data = response.data.message;
                res.status = 0;
            } else {
                res.data = [];
                for(let i = 0; i < response.data.length; i++) {
                    res.data[i] = response.data[i].message;
                }
                res.status = 1;
            }
        })
    } catch(err) {
        console.log(err);
    }
    return res;
}

Admin.prototype.clear = () => {
    errors = [];
}

export default Admin;