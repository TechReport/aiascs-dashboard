import { BrowserRouter } from 'react-router-dom';
import withSplashScreen from './Components/withSplashScreen'
import MainLayout from './Pages/Layout';
import axios from 'axios'
import 'antd/dist/antd.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

const baseURL = 'http://localhost:5400/'


axios.defaults.headers.common['Authorization'] =
  localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : 'undefined'

axios.defaults.timeout = 20000
axios.defaults.baseURL = baseURL


function App() {
  return (
    <BrowserRouter >
      <MainLayout />
    </BrowserRouter>
  );
}

export default withSplashScreen(App);
// export default App; 
