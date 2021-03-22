import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import routes from '../Components/routes';
import Sidebar from '../Components/Sidebar';

const { Content, Footer } = Layout;

export default function MainLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout">
                <Navbar />
                <Content style={{ padding: '0 10px', backgroundColor: 'white' }}>
                    <Switch>
                        {routes.map(route => <Route exact path={route.url} component={route.component} />)}
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
                    AIASCS ©2021 Created by dae54
                </Footer>
            </Layout>
        </Layout>
    )
}