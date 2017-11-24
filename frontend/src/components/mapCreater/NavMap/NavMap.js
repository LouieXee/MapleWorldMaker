import React from 'react';
import { Menu, Dropdown } from 'antd';

const { SubMenu, Item } = Menu;

export default class NavMap extends React.Component {

    constructor () {
        super(...arguments);
    }

    render () {
        return (
            <div>
                <Dropdown overlay={this._renderMenuMap()} trigger={["click"]}>
                    <a className="nav__dropdown" href="javascript:;">地图</a>
                </Dropdown>
                <Dropdown overlay={this._renderMenuPanel()} trigger={["click"]}>
                    <a className="nav__dropdown" href="javascript:;">面板</a>
                </Dropdown>
            </div>
        );
    }

    _renderMenuMap () {
        return (
            <Menu
                className="nav-map"
                theme="dark"
                selectable={false}
                onClick={this._handleMenuClick.bind(this)}
            >
                <Item key="import">导入地图</Item>
                <Item key="export">导出地图</Item>
                <Item key="adjust">调整尺寸</Item>
                <Item key="exit">退出</Item>
            </Menu>
        );
    }

    _renderMenuPanel () {
        return (
            <Menu
                className="nav-map"
                theme="dark"
                selectable={false}
                onClick={this._handleMenuClick.bind(this)}
            >
                <Item key="panel-types">地图元素</Item>
            </Menu>
        );
    }

    _handleMenuClick (obj) {
        this.props.onClick && this.props.onClick(obj.key);
    }

}
