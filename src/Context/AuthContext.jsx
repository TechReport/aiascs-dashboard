import React, { useReducer } from "react";
let initialState = {
    token: sessionStorage.getItem('token'),
    isLocked: false,
    authIssuedAt: '',
    currentUser: '',
    permissions: [],
    role: ''
    // permissions: {
    //     canEditUser: false, canDeleteUser: false, canAddUser: false, canUpdateUser: false, canViewOneUser: false, canViewUsers: false,
    //     canEditRequests: false, canDeleteRequests: false, canAddRequests: false, canUpdateRequests: false, canViewOneRequest: false, canViewURequests: false,
    // }
}
let reducer = (state, action) => {
    switch (action.type) {
        case 'authIssuedAt':
            return { ...state, authIssuedAt: state.authIssuedAt = action.payload }
        case 'currentUser':
            return { ...state, currentUser: state.currentUser = action.payload }
        case 'token':
            return { ...state, token: state.token = action.payload }
        case 'permissions':
            return { ...state, permissions: state.permissions = action.payload }
        default: return { ...state }
    }
}

const AuthContext = React.createContext(initialState);

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    let value = { state, dispatch }
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

const AuthContextConsumer = AuthContext.Consumer;
export { AuthContext, AuthContextConsumer, AuthContextProvider }



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