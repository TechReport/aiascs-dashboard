import { ApiCore } from "../../Services/api/Core";
// import { handleError, handleResponse } from "../../Services/api/Response";

const reportsAPI = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
});

reportsAPI.massUpdate = () => {
  // Add custom api call logic here
};

export { reportsAPI };
