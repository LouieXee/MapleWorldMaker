import React from 'react';

import PanelMap from '../../components/mapCreater/PanelMap';
import PanelTypes from '../../components/mapCreater/PanelTypes';

import MapElement from '../../models/MapElement';

export default class PageMapCreater extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            isPanelTypesVisible: true,
            elements: []
        };
    }

    render () {
        let { map } = this.props;

        return (
            <div className="map-creater">
                <PanelMap 
                    width={map.getWidth()} 
                    height={map.getHeight()} 
                    elements={this.state.elements} 
                />
                <PanelTypes 
                    visible={this.state.isPanelTypesVisible} 
                    types={map.getTypes()} 
                    onSelectElement={this._handleSelectElement.bind(this)}
                />
            </div>
        );
    }

    _handleSelectElement (element) {
        this.setState({
            elements: [...this.state.elements, new MapElement(element).setDragable(true)]
        })
    }

}
