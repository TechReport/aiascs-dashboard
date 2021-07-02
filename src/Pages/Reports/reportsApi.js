import axios from "axios";
import { ApiCore } from "../../Services/api/Core";
import { handleError, handleResponse } from "../../Services/api/Response";

const reportsAPI = new ApiCore({
  //   getAll: true,
  //   getSingle: true,
  //   post: true,
});

reportsAPI.massUpdate = () => {
  // Add custom api call logic here
};

// reportsAPI.productsVSCompany
reportsAPI.productsVSCompany = async (filter) => {
  return await axios
    .get("reports/productvscompany/", { params: filter })
    .then((res) => handleResponse(res))
    .catch((err) => handleError(err));
};

export { reportsAPI };
