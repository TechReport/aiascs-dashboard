// Task API
import axios from "axios";
import { ApiCore } from "../../../../Services/api/Core";
import { handleError, handleResponse } from "../../../../Services/api/Response";

// plural and single may be used for message logic if needed in the ApiCore class.

const productAPI = new ApiCore({
  getAll: true,

  // getSingle: true,
  post: true,
  deleteOne: true,
});

productAPI.getAdminStats = () => {
  return axios
    .get("products/adminstats")
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

productAPI.activity = async (productID) => {
  return await axios
    .get(`products/activity/${productID}`)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};
export { productAPI };
