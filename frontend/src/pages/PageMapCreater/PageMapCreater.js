import 'pixi.js';
import React from 'react';
import { Spin } from 'antd';

import PanelMap from '../../components/mapCreater/PanelMap';
import PanelTypes from '../../components/mapCreater/PanelTypes';
import PanelProperties from '../../components/mapCreater/PanelProperties';

import MapElement from '../../models/MapElement';
import { Dragable } from '../../utils';

const { loader } = PIXI;

export default class PageMapCreater extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            isLoading: true,
            isPanelTypesVisible: true,
            isPanelPropsVisible: false,
            selectElement: null,
            elements: []
        };
    }
    
    componentDidMount () {
        let textures = this.props.map.getTextures();

        loader
        .add(Object.keys(textures).map(key => (textures[key])))
        .load(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    render () {
        let { map } = this.props;

        return (
            <div className="map-creater" ref="proxy-container">
                {
                    this.state.isLoading 
                    ? (
                        <div className="common__tips-wrapper">
                            <Spin />
                        </div>
                    )
                    : (
                        <div>
                            <PanelMap 
                                ref='map'
                                width={map.getWidth()} 
                                height={map.getHeight()} 
                                elements={this.state.elements} 
                                onDragElement={this._handleDragElement.bind(this)}
                                onSelectElement={this._handleSelectElement.bind(this)}
                            />
                            <PanelTypes 
                                visible={this.state.isPanelTypesVisible} 
                                types={map.getTypes()} 
                                onDragElement={this._handleDragElement.bind(this)}
                            />
                            <PanelProperties
                                element={this.state.selectElement}
                                visible={this.state.isPanelPropsVisible}
                                onClose={this._handleClosePanelProps.bind(this)}
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    _transformPositionFromGlobalToMap (ele) {
        let eleData = ele.getBoundingClientRect();
        let mapData = this.refs.map.refs.panel.getBoundingClientRect();

        return {
            x: eleData.left - mapData.left,
            y: eleData.top - mapData.top
        };
    }

    _handleDragElement (element) {
        let { map } = this.props;
        let { elements } = this.state;
        let $container = this.refs['proxy-container'];
        let $proxy = document.createElement('div');
        let $canvas = element.getCanvas();

        const handleMouseMove = e => {
            $proxy.style.left = `${e.clientX - $canvas.width / 2}px`;
            $proxy.style.top = `${e.clientY - $canvas.height / 2}px`;

            element.setPosition(this._transformPositionFromGlobalToMap($proxy));
        };
        const handleMouseUp = e => {
            $proxy.style.left = `${e.clientX - $canvas.width / 2}px`;
            $proxy.style.top = `${e.clientY - $canvas.height / 2}px`;

            let pos = this._transformPositionFromGlobalToMap($proxy);

            element.setPosition(pos);

            if (pos.x >= 0 && pos.y >= 0 && pos.x <= map.getWidth() && pos.y <= map.getHeight()
             && elements.filter(tmp => ( tmp.getId() == element.getId() )).length == 0) {
                this.setState({
                    elements: [...elements, element]
                })
            } else if ((pos.x < 0 || pos.y < 0 || pos.x > map.getWidth() || pos.y > map.getHeight())
             && elements.find(tmp => ( tmp.getId() == element.getId() ))) {
                elements = elements.filter(tmp => ( tmp.getId() != element.getId() ));

                this.setState({
                    elements
                })
            }

            $proxy.remove();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        $proxy.appendChild($canvas);
        $proxy.style = `
            position: fixed;
            left: -${$canvas.width}px;
            top: -${$canvas.height}px;
            z-index: 1024;
            opacity: .4;
        `;

        $container.appendChild($proxy);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
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

}
