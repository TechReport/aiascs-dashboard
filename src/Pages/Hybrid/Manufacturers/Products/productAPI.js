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

productAPI.createBatch = (batchInfo) => {
  console.log(batchInfo);

  return axios
    .post("products/batches/", batchInfo)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

productAPI.getBatchesVSProducts = (companyId) => {
  return axios
    .get(`products/batchesVSProducts/${companyId}`)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

productAPI.getBatches = (companyId) => {
  return axios
    .get(`products/batches/${companyId}`)
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};
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

productAPI.fetchProductIDS = async (companyId) => {
  return await axios
    .get(`products/productIDs/${companyId}`)
    .then((res) => handleResponse(res))
    .catch((error) => handleError(error));
};

export { productAPI };
