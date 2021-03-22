import React, { Component } from 'react';
import loadSession from '../Services/auth/auth0Client';
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
                console.log('checking...')
                const resp = await loadSession()
                console.log(resp)
                console.log('done...')
                this.setState({
                    loading: false,
                    authenticated: resp.status
                });
                
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            // while checking user session, show "loading" message
            if (this.state.loading) return LoadingMessage();

            // otherwise, show the desired route
            return <WrappedComponent {...this.props} />;
        }
    };
}

export default withSplashScreen;