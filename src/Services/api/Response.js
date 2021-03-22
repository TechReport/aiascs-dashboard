// import { EventEmitter } from 'events'
import eventEmitter from '../EventEmitter'

export function handleResponse(response) {
    console.log(response)
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        return response.data;
    }

    return response;
}

export function handleError(error) {
    // if (error.data) {
    //     throw error.data;
    // }
    if (error.message === 'Network Error') {
        console.log('weve network error')
        throw { status: 'error', response: [{ message: 'Network Error', data: { dev_error: error, descriptions: 'Something is temporarily wrong with your network connection. Please make sure you are connected to the internet and then try again' } }] }
    } else {
        throw { status: 'error', response: [{ message: error.response.message, data: { dev_error: error.response.errorObj, descriptions: 'Something went wrong. Please retry after sometimes' } }] }
        // throw error;
    }
}