import { BrowserRouter } from 'react-router-dom';
import withSplashScreen from './Components/withSplashScreen'
import MainLayout from './Pages/Layout';
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter >
      <MainLayout />
    </BrowserRouter>
  );
}

export default withSplashScreen(App);
