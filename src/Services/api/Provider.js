import axios from "axios";
import { handleResponse, handleError } from "./Response";

/** @param {string} resource */
const getAll = (resource, select, filter) => {
  return axios
    .get(`/${resource}`, {
      params: { select, filter },
    })
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource  @param {object} filter */
const getMany = (resource, filter, select, count) => {
  return (
    axios
      // .get(`${resource}`, filter, { count })
      .get(`/${resource}`, {
        params: { filter, select, count },
      })
      .then(handleResponse)
      .catch(handleError)
  );
};

/** @param {string} resource @param {string} id */
const getSingle = (resource, id) => {
  // console.log(resource)
  // console.log(id)
  return axios
    .get(`/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource @param {object} model */
const post = (resource, model) => {
  // console.log(resource)
  // console.log(model)
  return axios
    .post(`/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource @param {string} id */
const deleteOne = (resource, id) => {
  return axios
    .delete(`${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

/**
 *
 * @param {string} resource Endpoint for updating the item
 * @param {Object} updateData Data object to be updated
 * @param {String} resourceId Resource id to be updated
 */
const updateOne = (resource, updateData, resourceId) => {
  return axios
    .put(`${resource}/update/${resourceId}`, updateData)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
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
  deleteOne,
  getMany,
  updateOne
  // put,
  // patch,
  // remove,
};
