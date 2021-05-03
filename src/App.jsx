import { BrowserRouter } from 'react-router-dom';
import withSplashScreen from './Components/withSplashScreen'
import MainLayout from './Pages/Layout';
import axios from 'axios'
import { AuthContextProvider } from './Context/AuthContext';

import 'antd/dist/antd.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://secret-ridge-42311.herokuapp.com/api/v1/' : 'http://localhost:5400/api/v1/'

axios.defaults.headers.common['Authorization'] =
    localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : 'undefined'

axios.defaults.timeout = 120000
axios.defaults.baseURL = baseURL


function App() {
    return (
        <BrowserRouter >
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default withSplashScreen(App);
// export default App;


/**
 *
 * import { BrowserRouter } from 'react-router-dom';
import WithSplashScreen from './Components/withSplashScreen'
import MainLayout from './Pages/Layout';
import axios from 'axios'
import { AuthContextProvider } from './Context/AuthContext';

import 'antd/dist/antd.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import UserContext from './Context/UserContext';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://secret-ridge-42311.herokuapp.com/' : 'http://localhost:5400/api/v1/'

axios.defaults.headers.common['Authorization'] =
    localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : 'undefined'

axios.defaults.timeout = 20000
axios.defaults.baseURL = baseURL

function App() {
    return (
        <BrowserRouter >
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </BrowserRouter>
    );
}


function ContextController() {
    return (
        <UserContext>
            <WithSplashScreen App={App} />
        </UserContext>
    )
}

export default ContextController
// export default App;

 */