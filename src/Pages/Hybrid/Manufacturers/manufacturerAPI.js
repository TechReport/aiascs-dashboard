// import axios from 'axios';
import axios from "axios";
// import { ApiCore } from '../../Services/api/Core';
import { ApiCore } from "../../../Services/api/Core";
import { handleError, handleResponse } from "../../../Services/api/Response";
// import { handleResponse, handleError } from '../../Services/api/Response';

// import { handleError, handleResponse } from '../api/Response';

// plural and single may be used for message logic if needed in the ApiCore class.

const manufacturerAPI = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  deleteOne: true,
  updateOne: true,
});

// adminAPI.assignAdminToManufacturer = async (resource, companyId, userId) => {
//     return await axios.put(`${resource}/${companyId}/${userId}`,)
//         .then(res => {
//             return handleResponse(res)
//         }).catch(err => {
//             return handleError(err)
//         })
// }

manufacturerAPI.assignAdmin = async (resource, companyId, userId) => {
  return await axios
    .put(`${resource}/${companyId}/${userId}`)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};
manufacturerAPI.getUsers = async (companyId, select, count) => {
  return await axios
    .get(`user/`, {
      params: { select, count, companyId },
    })
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

manufacturerAPI.getProductsVSTime = async (filter) => {
  return await axios
    .get("products/productVSTime/", { params: filter })
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

manufacturerAPI.productsVSCompany = async () => {
  return await axios
    .get("products/productsVSCompany/")
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

manufacturerAPI.registeredVSUnregistered = async () => {
  return await axios
    .get("products/registeredVSUnregistered/")
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

manufacturerAPI.verifiedVSUnverified = async () => {
  return await axios
    .get("products/verifiedVSUnverified/")
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

manufacturerAPI.getAssociatedAgents = async (companyId) => {
  return await axios
    .get(`manufacture/associatedAgents/${companyId}`)
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

// manufacturerAPI.updateOne = async (data, companyId) => {
//   return await axios
//     .put(`manufacture/update/${companyId}`, data)
//     .then((res) => {
//       return handleResponse(res);
//     })
//     .catch((err) => {
//       return handleError(err);
//     });
// };

export { manufacturerAPI };
