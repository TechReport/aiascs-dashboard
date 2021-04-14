import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import routes, { openRoutes } from '../Components/routes';
import RouteWrapper from '../Components/RouteWrapper';
import Sidebar from '../Components/Sidebar';
import NotFound from './Errors/NotFound';

const { Content, Footer } = Layout;

export default function MainLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout">
                <Navbar />
                <Content style={{ padding: '0 10px', backgroundColor: 'white' }}>
                    <Switch>
                        {routes.map(route => route.submenu ?
                            route.submenu.map(subroute =>
                                <Route exact path={subroute.url} component={subroute.component} />
                            )
                            :
                            <RouteWrapper
                                exact
                                path={route.url}
                                component={route.component}
                                roles={route.roles} />
                        )}
                        {openRoutes.map(route =>
                            <Route exact path={route.url} component={route.component} />
                        )}
                        <Route component={NotFound} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
                    AIASCS ©2021 Created by AIASCS SecretRidge
                </Footer>
            </Layout>
        </Layout>
    )
}