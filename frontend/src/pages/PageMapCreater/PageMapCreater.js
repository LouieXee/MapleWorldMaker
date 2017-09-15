import React from 'react';

import PanelMap from '../../components/mapCreater/PanelMap';
import PanelElements from '../../components/mapCreater/PanelElements';

export default class PageMapCreater extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            isPanelElementsVisible: true
        };
    }

    render () {
        let { map } = this.props;

        return (
            <div className="map-creater">
                <PanelMap width={1000} height={800} />
                <PanelElements 
                    visible={this.state.isPanelElementsVisible} 
                    map={map} 
                    onSelectElement={this._handleSelectElement.bind(this)}
                />
            </div>
        );
    }

    _handleSelectElement (type) {
        
    }

}
