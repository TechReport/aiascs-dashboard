// Task API
import axios from 'axios';
import { ApiCore } from '../api/Core'
import { handleError, handleResponse } from '../api/Response';


// plural and single may be used for message logic if needed in the ApiCore class.

const authAPI = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
});

authAPI.checkSession = async () => {
    return await axios.get('/acc/auth')
        .then(res => {
            return handleResponse(res)
        }).catch(err => {
            return handleError(err)
        })
}

authAPI.login = async (userDetails) => {
    return await axios.post('/user/login', userDetails)
        .then(res => {
            return handleResponse(res)
        }).catch(err => {
            return handleError(err)
        })
}

authAPI.signOut = async () => {
    return await axios.post('/user/signout')
        .then(res => {
            localStorage.clear()
            sessionStorage.clear()
            return window.location.reload()
        }).catch(err => {
            return handleError(err)
        })
}

authAPI.resetPassword = async (userData) => {
    console.log(userData)

    // const res = await axios.patch('https://httpbin.org/patch',
    //     { firstName: 'MasteringJS' }
    // );

    return await axios.patch('/user/resetPassword',
        userData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ftl')}`
        }
    })
        .then(res => {
            return handleResponse(res)
        }).catch(err => {
            return handleError(err)
        })
}

export { authAPI };