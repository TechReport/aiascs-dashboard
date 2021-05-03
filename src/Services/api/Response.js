// import { EventEmitter } from 'events'
import eventEmitter from "../EventEmitter";

export function handleResponse(response) {
  if (response.results) {
    return response.results;
  } else if (response.data) {
    return response.data;
  } else {
    return response;
  }
}

export function handleError(error) {
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
  } else if (error.message.includes("timeout")) {
    // eslint-disable-next-line
    throw {
      message: error.message,
      descriptions:
        "Request took longer than expected. Please make sure you are connected to the internet and then try again",
      debug: {
        dev_error: error.message,
        stack: error,
      },
    };
  } else if (error.response.status === 401) {
    eventEmitter.emit("unauthorized");
    return;
  } else if (error.response.status === 406) {
    // eslint-disable-next-line
    throw {
      message: error.response.data.message,
      descriptions: "Please correct the entry and try again",
      debug: {
        dev_error: error.response.data.developerMessage,
        stack: error.response.data.stack,
      },
    };
  } else if (error.response.data.category === "invalidInput") {
    // eslint-disable-next-line
    throw {
      message: error.response.data.message,
      descriptions: "Please correct the entry and try again",
      debug: {
        dev_error: error.response.data.developerMessage,
        stack: error.response.data.stack,
      },
    };
  } else {
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

  //   if (error.message === "Network Error") {
  //     // eslint-disable-next-line
  //     throw {
  //       message: error.message,
  //       descriptions:
  //         "Something is temporarily wrong with your network connection. Please make sure you are connected to the internet and then try again",
  //       debug: {
  //         dev_error: error.message,
  //         stack: error,
  //       },
  //     };
  //   } else if (error.message.includes("timeout")) {
  //     throw {
  //       message: error.message,
  //       descriptions:
  //         "Request took longer than expected. Please make sure you are connected to the internet and then try again",
  //       debug: {
  //         dev_error: error.message,
  //         stack: error,
  //       },
  //     };
  //   } else {
  //     if (error.response.status === 401) {
  //       eventEmitter.emit("unauthorized");
  //       return;
  //     } else if (error.response.status === 406) {
  //       throw {
  //         message: error.response.data.message,
  //         descriptions: "Please correct the entry and try again",
  //         debug: {
  //           dev_error: error.response.data.developerMessage,
  //           stack: error.response.data.stack,
  //         },
  //       };
  //     }
  //     if (error.response.data.category === "invalidInput") {
  //       // eslint-disable-next-line
  //       throw {
  //         message: error.response.data.message,
  //         descriptions: "Please correct the entry and try again",
  //         debug: {
  //           dev_error: error.response.data.developerMessage,
  //           stack: error.response.data.stack,
  //         },
  //       };
  //     }
  //     else {
  //       // eslint-disable-next-line
  //       throw {
  //         status: "error",
  //         response: {
  //           message: error.response.data.message,
  //           data: {
  //             dev_error: error.response.data.errorObj,
  //             descriptions: "Something went wrong. Please retry after sometimes",
  //           },
  //         },
  //       };
  //     }
  //   }
}
