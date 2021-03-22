import axios from 'axios';
import { handleResponse, handleError } from './response';

const BASE_URL = 'http://localhost:8500/api/v1';

/** @param {string} resource */
const getAll = (resource) => {
    return axios
        .get(`${BASE_URL}/${resource}`)
        .then(handleResponse)
        .catch(handleError);
};


/** @param {string} resource @param {string} id */
const getSingle = (resource, id) => {
    return axios
        .get(`${BASE_URL}/${resource}/${id}`)
        .then(handleResponse)
        .catch(handleError);
};

/** @param {string} resource @param {object} model */
const post = (resource, model) => {
    console.log(resource)
    console.log(model)
    return axios
        .post(`${BASE_URL}/${resource}`, model)
        .then(handleResponse)
        .catch(handleError);
};


// /** @param {string} resource  @param {object} model */
// const put = (resource, model) => {
//     return axios
//         .put(`${BASE_URL}/${resource}`, model)
//         .then(handleResponse)
//         .catch(handleError);
// };

// /** @param {string} resource  @param {object} model */
// const patch = (resource, model) => {
//     return axios
//         .patch(`${BASE_URL}/${resource}`, model)
//         .then(handleResponse)
//         .catch(handleError);
// };

// /** @param {string} resource @param {string} id */
// const remove = (resource, id) => {
//     return axios
//         .delete(`${BASE_URL}/${resource}`, id)
//         .then(handleResponse)
//         .catch(handleError);
// };

export const apiProvider = {
    getAll,
    getSingle,
    post,
    // put,
    // patch,
    // remove,
};