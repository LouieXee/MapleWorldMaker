import './App.less';

import edge from '../res/edge.png';
import ground from '../res/ground.png';
import slopeLeft from '../res/slope-left.png';
import slopeRight from '../res/slope-right.png';
import wallLeft from '../res/wall-left.png';
import wallRight from '../res/wall-right.png';

import React from 'react';
import { Layout } from 'antd';

import PageMapCreater from './pages/PageMapCreater';
import Map from './models/Map';

const { Header, Content } = Layout;

const MAP = new Map({
    edge,
    ground,
    slopeLeft,
    slopeRight,
    wallLeft,
    wallRight
})

export default class App extends React.Component {

    render () {
        return (
            <Layout className="app">
                <Header className="app__header">
                    <a href="javascript:;" className="app__logo">MWMaker</a>
                </Header>
                <Content className="app__content">
                    <PageMapCreater map={MAP} />
                </Content>
            </Layout>
        );
    }

}
