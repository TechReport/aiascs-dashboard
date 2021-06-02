// import axios from 'axios';
import axios from "axios";
// import { ApiCore } from '../../Services/api/Core';
import { ApiCore } from "../../../Services/api/Core";
import { handleError, handleResponse } from "../../../Services/api/Response";
// import { handleResponse, handleError } from '../../Services/api/Response';

// import { handleError, handleResponse } from '../api/Response';

// plural and single may be used for message logic if needed in the ApiCore class.

const qualityControllerAPI = new ApiCore({
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

qualityControllerAPI.assignAdmin = async (resource, companyId, userId) => {
  return await axios
    .put(`qualitycontrollers/assignAdmin/${companyId}/${userId}`)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

qualityControllerAPI.getUsers = async (select, filter) => {
  return await axios
    .get(`user/`, {
      params: { select, filter },
    })
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

qualityControllerAPI.revokeProduct = async (productID, descriptions) => {
  return await axios
    .patch(`products/revoke/${productID}`, { descriptions })
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

qualityControllerAPI.revokeBatch = async (batch, descriptions) => {
  return await axios
    .patch(`products/revokebatch`, { descriptions, batch })
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

export { qualityControllerAPI };
