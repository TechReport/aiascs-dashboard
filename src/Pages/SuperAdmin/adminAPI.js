// import axios from 'axios';
import axios from 'axios';
import { ApiCore } from '../../Services/api/Core';
import { handleError, handleResponse } from '../../Services/api/Response';
// import { handleResponse, handleError } from '../../Services/api/Response';

// import { handleError, handleResponse } from '../api/Response';


// plural and single may be used for message logic if needed in the ApiCore class.

const adminAPI = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    deleteOne: true
});

// adminAPI.assignAdminToManufacturer = async (resource, companyId, userId) => {
//     return await axios.put(`${resource}/${companyId}/${userId}`,)
//         .then(res => {
//             return handleResponse(res)
//         }).catch(err => {
//             return handleError(err)
//         })
// }

adminAPI.assignAdmin = async (resource, companyId, userId) => {
    return await axios.put(`${resource}/${companyId}/${userId}`,)
        .then(res => {
            return handleResponse(res)
        }).catch(err => {
            return handleError(err)
        })
}


export { adminAPI };