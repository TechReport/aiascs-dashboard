import { notification } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Pages/Authentication';
import { authAPI } from '../Services/auth/authAPI';
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
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                authenticated: false
            };
        }

        async componentDidMount() {
            try {
                // console.log('checking...')
                await authAPI.checkSession()
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
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    return
                }
            }
        }

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