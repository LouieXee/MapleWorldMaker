import React from 'react';
import { Menu } from 'antd';

const { SubMenu, Item } = Menu;

export default class NavMap extends React.Component {

    constructor () {
        super(...arguments);
    }

    render () {
        return (
            <Menu
                className="nav-map"
                theme="dark"
                mode="horizontal"
                selectable={false}
                onClick={this._handleMenuClick.bind(this)}
            >
                <SubMenu className="nav-map__sub" title="地图">
                    <Item className="nav-map__item"  key="import">导入地图</Item>
                    <Item className="nav-map__item"  key="export">导出地图</Item>
                    <Item className="nav-map__item"  key="adjust">调整尺寸</Item>
                    <Item className="nav-map__item"  key="exit">退出</Item>
                </SubMenu>
                <SubMenu className="nav-map__sub" title="面板">
                    <Item className="nav-map__item"  key="panel-types">地图元素</Item>
                </SubMenu>
            </Menu>
        );
    }

    _handleMenuClick (obj) {
        this.props.onClick && this.props.onClick(obj.key);
    }

}
