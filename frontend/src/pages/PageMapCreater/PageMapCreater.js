import 'pixi.js';
import React from 'react';
import { Spin } from 'antd';

import PanelMap from '../../components/mapCreater/PanelMap';
import PanelTypes from '../../components/mapCreater/PanelTypes';

import MapElement from '../../models/MapElement';
import { Dragable } from '../../utils';

const { loader } = PIXI;

export default class PageMapCreater extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            isLoading: true,
            isPanelTypesVisible: true,
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
                                width={map.getWidth()} 
                                height={map.getHeight()} 
                                elements={this.state.elements} 
                                onSelectElement={this._handleSelectElement.bind(this)}
                            />
                            <PanelTypes 
                                visible={this.state.isPanelTypesVisible} 
                                types={map.getTypes()} 
                                onSelectElement={this._handleSelectElement.bind(this)}
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    _handleSelectElement (element) {
        let elements = this.state.elements;
        let $container = this.refs['proxy-container'];
        let $proxy = document.createElement('div');
        let $texture = element.getTexture();

        const handleMouseMove = e => {
            $proxy.style.left = `${e.clientX - $texture.width / 2}px`;
            $proxy.style.top = `${e.clientY - $texture.height / 2}px`;
        };
        const handleMouseUp = e => {
            $proxy.remove();

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        if (elements.filter(tmp => (tmp.getId() == element.getId())).length == 0) {
            this.setState({
                elements: [...elements, element]
            })
        }

        $proxy.appendChild($texture);
        $proxy.style = `
            position: fixed;
            left: -${$texture.width}px;
            top: -${$texture.height}px;
            z-index: 1024;
        `;

        $container.appendChild($proxy);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

}
