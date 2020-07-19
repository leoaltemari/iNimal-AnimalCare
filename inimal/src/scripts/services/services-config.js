'use strict'
import axios from 'axios';

// Attributes
let errors;

// Constructor
function Service() {

}

// Methods
Service.prototype.getServices = async () => {
    let res = [];
    try {
        const url =`http://localhost:8081/services`;

        await axios.get(url)
        .then(response => {
            res = response.data;
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}

Service.prototype.schedule = async (userData, userToken) => {
    let res = [];
    try {
        const url =`http://localhost:8081/schedules`;
        const data = userData;
        data.token = userToken;

        await axios.post(url, data)
        .then(response => {
            res = response.data;
        });
    } catch (err) {
        console.log(err);
    }
    return res;
}

Service.prototype.clear = () => {
    errors = [];
}

export default Service;