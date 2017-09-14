import React from 'react';

import PanelMap from '../../components/mapCreater/PanelMap';

export default class PageMapCreater extends React.Component {

    render () {
        return (
            <div className="map-creater">
                <PanelMap width={1000} height={800} />
            </div>
        );
    }

}
