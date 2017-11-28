import 'pixi.js';
import React from 'react';
import { Spin } from 'antd';

import displayObject from '../../../res/displayObject.png';
import sprite from '../../../res/sprite.png';

import PanelMap from '../../components/mapCreater/PanelMap';
import PanelTypes from '../../components/mapCreater/PanelTypes';
import PanelProperties from '../../components/mapCreater/PanelProperties';
import NavMap from '../../components/mapCreater/NavMap';

import MapElement from '../../models/MapElement';
import { Dragable } from '../../utils';

const { loader } = PIXI;

export default class PageMapCreater extends React.Component {

    constructor () {
        super(...arguments);

        this._elements = [];
        this.state = {
            isLoading: true,
            isPanelTypesVisible: false,
            isPanelPropsVisible: false,
            selectElement: null
        };
    }
    
    componentDidMount () {
        let textures = this.props.map.getTextures();

        loader
        .add(Object.keys(textures).map(key => (textures[key])))
        .add(displayObject)
        .add(sprite)
        .load(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    render () {
        let { map } = this.props;

        return (
            <div className="map-creater" ref={proxyContainer => { this.proxyContainer = proxyContainer; }}>
                <div className="map-creater__header nav">
                    <NavMap
                        onClick={this._handleNavSelect.bind(this)}
                    />
                </div>
                <div className="map-creater__body">
                    {
                        this.state.isLoading 
                        ? (
                            <div className="common__tips-wrapper"> <Spin /> </div>
                        )
                        : (
                            <div>
                                <PanelMap 
                                    ref={map => { this.panelMap = map; }}
                                    width={map.getWidth()} 
                                    height={map.getHeight()} 
                                    onDragElement={this._handleDragElement.bind(this)}
                                    onSelectElement={this._handleSelectElement.bind(this)}
                                />
                                <PanelTypes 
                                    visible={this.state.isPanelTypesVisible} 
                                    types={map.getTypes()} 
                                    onClose={this._handleClosePanelTypes.bind(this)}
                                    onDragElement={this._handleDragElement.bind(this)}
                                />
                                <PanelProperties
                                    element={this.state.selectElement}
                                    visible={this.state.isPanelPropsVisible}
                                    onClose={this._handleClosePanelProps.bind(this)}
                                    onUpdateElement={this._handleUpdateElement.bind(this)}
                                    onDeleteElement={this._handleDeleteElement.bind(this)}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    _transformPositionFromGlobalToMap (ele) {
        let eleData = ele.getBoundingClientRect();
        let mapData = this.panelMap.panel.getBoundingClientRect();

        return {
            x: eleData.left - mapData.left,
            y: eleData.top - mapData.top
        };
    }

    _handleNavSelect (key) {
        switch (key) {
            case 'panel-types' :
                this.setState({
                    isPanelTypesVisible: true
                })
                break;
        }
    }

    _handleDragElement (element) {
        let { map } = this.props;
        let elements = this._elements;
        let mapComponent = this.panelMap;
        let $container = this.proxyContainer;
        let $proxy = document.createElement('div');
        let $texture = element.toDOM();

        const handleMouseMove = e => {
            e.preventDefault();

            $proxy.style.left = `${e.clientX - $texture.width / 2}px`;
            $proxy.style.top = `${e.clientY - $texture.height / 2}px`;

            element.setPosFromDragPos(this._transformPositionFromGlobalToMap($proxy));
        };
        const handleMouseUp = e => {
            e.preventDefault();

            $proxy.style.left = `${e.clientX - $texture.width / 2}px`;
            $proxy.style.top = `${e.clientY - $texture.height / 2}px`;

            let pos = this._transformPositionFromGlobalToMap($proxy);

            if (pos.x + $texture.width / 2 < 0 || pos.y + $texture.height / 2 < 0 || pos.x + $texture.width / 2 > map.getWidth() || pos.y + $texture.height / 2 > map.getHeight()) {
                elements = elements.filter(tmp => ( tmp.getId() != element.getId() ));

                this._elements = elements;
                mapComponent.updateElements(elements);
            }

            mapComponent.setDragedElement(null);

            $proxy.remove();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        if (!elements.find(tmp => (tmp.getId() == element.getId()))) {
            elements.push(element);
            mapComponent.updateElements(elements)
        }

        mapComponent.setDragedElement(element);

        $proxy.appendChild($texture);
        $proxy.style = `
            position: fixed;
            left: -${$texture.width}px;
            top: -${$texture.height}px;
            z-index: 1024;
            opacity: .2;
        `;

        $container.appendChild($proxy);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    _handleUpdateElement (element, newProps) {
        element.setProps(newProps);
        this.panelMap.updateElements(this._elements);

        this.setState({
            isPanelPropsVisible: false
        })
    }

    _handleDeleteElement (element) {
        this._elements = this._elements.filter(tmp => (tmp.getId() != element.getId() ));
        this.panelMap.updateElements(this._elements);

        this.setState({
            isPanelPropsVisible: false
        })
    }

    _handleSelectElement (element) {
        this.setState({
            selectElement: element,
            isPanelPropsVisible: true
        })
    }

    _handleClosePanelProps () {
        this.setState({
            selectElement: null,
            isPanelPropsVisible: false
        })
    }

    _handleClosePanelTypes () {
        this.setState({
            isPanelTypesVisible: false
        })
    }

}
