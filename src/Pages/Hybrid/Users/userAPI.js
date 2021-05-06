// Task API
import axios from "axios";
import { ApiCore } from "../../../Services/api/Core";
import { handleError, handleResponse } from "../../../Services/api/Response";

// plural and single may be used for message logic if needed in the ApiCore class.

const userAPI = new ApiCore({
  getAll: true,
  deleteOne: true,
  // getMany: true,
  // getByRole: true,

  getSingle: true,
  post: true,
});

// apiTasks.massUpdate = () => {
//     // Add custom api call logic here
// }
/** @deprecated */
userAPI.getByRole = async (resource, filter, select, companyId) => {
  return await axios
    .get(`/${resource}`, {
      params: { filter, select, companyId },
    })
    // TODO
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

userAPI.getCompanyUserByRole = async (filter, select) => {
  return await axios
    .get("/user/getCompanyUserByRole", {
      params: { filter, select },
    })
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

// userAPI.getByCompany = async (companyId, select, count) => {
//     return await axios.get(`/user/company/${companyId}`, {
//         params: { select, count }
//     })
//         .then(res => {
//             return handleResponse(res)
//         }).catch(err => {
//             return handleError(err)
//         })
// }

export { userAPI };
