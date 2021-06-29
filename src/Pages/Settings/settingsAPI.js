// Task API
import axios from "axios";
import { ApiCore } from "../../Services/api/Core";
import { handleError, handleResponse } from "../../Services/api/Response";

const settingsAPI = new ApiCore({
  getAll: true,
  deleteOne: true,
  updateOne: true,
  // getMany: true,
  // getByRole: true,

  getSingle: true,
  post: true,
});

// apiTasks.massUpdate = () => {
//     // Add custom api call logic here
// }
settingsAPI.changePassword = async (oldPassword, newPassword) => {
  return await axios
    .patch("/user/changePassword", { newPassword, oldPassword })
    .then((res) => {
      return handleResponse(res);
    })
    .catch((err) => {
      return handleError(err);
    });
};

export { settingsAPI };
