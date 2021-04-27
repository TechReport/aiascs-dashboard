// Task API
import axios from 'axios';
import { ApiCore } from '../../../Services/api/Core'
import { handleError, handleResponse } from '../../../Services/api/Response';


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
userAPI.getByRole = async (resource, role, select, count) => {
    return await axios.get(`/${resource}`, {
        params: { role, select, count }
    })
        .then(res => {
            return handleResponse(res)
        }).catch(err => {
            return handleError(err)
        })
}

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