import React, { useReducer } from "react";
let initialState = {
  location: {},
  duration: "",
  charts: true,
};
let reducer = (state, action) => {
  switch (action.type) {
    case "location":
      return { ...state, location: (state.location = action.payload) };
    case "duration":
      return { ...state, duration: (state.duration = action.payload) };
    case "charts":
      return { ...state, charts: (state.charts = action.payload) };
    case "toggleCharts":
      return { ...state, charts: !state.charts };
    default:
      return { ...state };
  }
};

const ConfigurationContext = React.createContext(initialState);

const ConfigurationContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <ConfigurationContext.Provider value={value}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};

const ConfigurationContextConsumer = ConfigurationContext.Consumer;
export {
  ConfigurationContext,
  ConfigurationContextConsumer,
  ConfigurationContextProvider,
};

// import React, { Component } from 'react'

// const AuthContext = React.createContext()

// class AuthProvider extends Component {
//     // Context state
//     state = {
//         currentUser: {},
//         token: sessionStorage.getItem('token'),
//         authIssuedAt: '',
//         permissions: [],
//     }

//     // Method to update state
//     setCurrentUser = (user) => {
//         this.setState((prevState) => ({ user }))
//     }

//     setToken = (token) => {
//         this.setState((prevState) => ({ token }))
//     }

//     setPermiissions = (permissions) => {
//         this.setState((prevState) => ({ permissions }))
//     }

//     render() {
//         const { children } = this.props
//         const { currentUser } = this.state
//         const { token } = this.state
//         const { permissions } = this.state
//         const { setCurrentUser } = this
//         const { setToken } = this
//         const { setPermiissions } = this

//         return (
//             <AuthContext.Provider
//                 value={
//                     {
//                         currentUser, setCurrentUser,
//                         token, setToken,
//                         permissions, setPermiissions
//                     }
//                 }
//             // value={{
//             //     setCurrentUser,
//             //     setToken,
//             //     setPermiissions
//             // }}
//             >
//                 {children}
//             </AuthContext.Provider>
//         )
//     }
// }

// export default AuthContext

// export { AuthProvider }
