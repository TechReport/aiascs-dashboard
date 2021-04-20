import { notification } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Login from '../Pages/Authentication';
import { authAPI } from '../Services/auth/authAPI';
// import eventEmititer from '../Services/EventEmitter'
import '../Styles/splashscreen.css';


function LoadingMessage() {
    return (
        <div className="splash">
            <span>Welcome</span>
            <span style={{ fontSize: '100px' }}>AIASCS</span>
            <div className="loading-dot">.</div>
        </div>
    );
}

function openNotification({ message, description = '' }) {
    notification.warn({
        message,
        description,
        placement: 'bottomLeft'
    });
};


function withSplashScreen(WrappedComponent) {
    return class extends Component {
        static contextType = AuthContext
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                authenticated: false
            };
        }

        async componentDidMount() {
            try {
                const { dispatch } = this.context;
                let setCurrentUser = currentUser => dispatch({ type: 'currentUser', payload: currentUser })
                // let setPermissions = permissions => dispatch({ type: 'permissions', payload: permissions })
                // console.log('checking...')
                const result = await authAPI.checkSession()
                // eventEmititer.emit('currentUserInfo', result)
                setCurrentUser(result.user)
                // console.log(resp)
                // console.log('done...')
                return this.setState({
                    loading: false,
                    authenticated: true
                });

            } catch (err) {
                this.setState({
                    loading: false,
                    authenticated: false
                });
                if (localStorage.getItem('token')) {
                    openNotification({ message: err.message, description: err.descriptions })
                    // localStorage.removeItem('token')
                    // localStorage.removeItem('user')
                    return
                }
            }
        }
        // componentDidUpdate() {
        //     eventEmititer.addListener('unauthorized', (message) => {
        //         console.log('component did catch')
        //         console.log(message)
        //     })
        // }

        render() {
            // while checking user session, show "loading" message
            if (this.state.loading) return LoadingMessage();

            // otherwise, show the desired route
            // return this.state.authenticated ? <WrappedComponent {...this.props} /> : <Login />;
            return (
                <BrowserRouter>
                    {this.state.authenticated ? <WrappedComponent {...this.props} /> : <Login />}
                </BrowserRouter>
            )
        }
    };
}

export default withSplashScreen;













// import { notification } from 'antd';
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Login from '../Pages/Authentication';
// import { authAPI } from '../Services/auth/authAPI';
// import eventEmititer from '../Services/EventEmitter'

// // import { AuthContext } from '../Context/AuthContext'

// import '../Styles/splashscreen.css';


// // function loadingMessage() {
// //     return (
// //         <div className="splash">
// //             <span>Welcome</span>
// //             <span style={{ fontSize: '100px' }}>AIASCS</span>
// //             <div className="loading-dot">.</div>
// //         </div>
// //     );
// // }

// // function openNotification({ message, description = '' }) {
// //     notification.warn({
// //         message,
// //         description,
// //         placement: 'bottomLeft'
// //     });
// // };

// function WithAuthVerify() {
//     const [loading, setLoading] = useState(true)
//     const [authenticated, setAuthenticated] = useState(false)

//     useEffect(() => {
//         authAPI.checkSession().then(result => {
//             console.log(result)
//             setAuthenticated(true)
//             setLoading(false)
//         }).catch(err => {
//             console.log(err)
//             setAuthenticated(false)
//             setLoading(false)
//             if (localStorage.getItem('token')) {
//                 // openNotification({ message: err.message, description: err.descriptions })
//                 // localStorage.removeItem('token')
//                 // localStorage.removeItem('user')
//                 return
//             }
//         })

//         return () => {
//             console.log('exiting')
//         }
//     }, [])


//     // while checking user session, show "loading" message
//     // if (loading) return loadingMessage();

//     // otherwise, show the desired route
//     // return this.state.authenticated ? <WrappedComponent {...this.props} /> : <Login />;
//     return (
//         <BrowserRouter>
//         sdf
//             {/* {authenticated ? <WrappedComponent /> : <Login />} */}
//         </BrowserRouter>
//     )
// }

// export default WithAuthVerify;

