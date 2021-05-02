// import { EventEmitter } from 'events'
import eventEmitter from "../EventEmitter";

export function handleResponse(response) {
  // console.log(response)
  if (response.results) {
    console.log("UNEXPECTED");
    return response.results;
  } else if (response.data) {
    // console.log('return here')
    // console.log(response.data)
    return response.data;
  } else {
    console.log("SIELEW");
    return response;
  }
}

export function handleError(error) {
  // console.log(error.response)
  // console.log(error)
  if (error.message === "Network Error") {
    // eslint-disable-next-line
    throw {
      message: error.message,
      descriptions:
        "Something is temporarily wrong with your network connection. Please make sure you are connected to the internet and then try again",
      debug: {
        dev_error: error.message,
        stack: error,
      },
    };
  } else {
    if (error.response.status === 401) {
      eventEmitter.emit("unauthorized");
      return;
    }
    if (error.response.data.category === "invalidInput") {
      // eslint-disable-next-line
      throw {
        message: error.response.data.message,
        descriptions: "Please correct the entry and try again",
        debug: {
          dev_error: error.response.data.developerMessage,
          stack: error.response.data.stack,
        },
      };
    }
    //  else if (error.response.data.category === "unauthorized") {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   eventEmitter.emit("unauthorized", error.response.data.message);
    //   // eslint-disable-next-line
    //   throw {
    //     message: error.response.data.message,
    //     descriptions: "Please login again to access the resources",
    //     // debug: {
    //     //     dev_error: error.response.data.developerMessage,
    //     //     stack: error.response.data.stack
    //     // }
    //   };
    // }
    else {
      // eslint-disable-next-line
      throw {
        status: "error",
        response: {
          message: error.response.data.message,
          data: {
            dev_error: error.response.data.errorObj,
            descriptions: "Something went wrong. Please retry after sometimes",
          },
        },
      };
    }
    // throw error;
  }
}
