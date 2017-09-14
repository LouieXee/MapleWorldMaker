import './App.less';

import React from 'react';
import { Layout } from 'antd';

import PageMapCreater from './pages/PageMapCreater';

const { Header, Content } = Layout;

export default class App extends React.Component {

    render () {
        return (
            <Layout className="app">
                <Header className="app__header">
                    <a href="javascript:;" className="app__logo">MWMaker</a>
                </Header>
                <Content className="app__content">
                    <PageMapCreater />
                </Content>
            </Layout>
        );
    }

}
