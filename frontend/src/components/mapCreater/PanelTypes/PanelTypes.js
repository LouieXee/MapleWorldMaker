import React from 'react';

import Panel from '../../common/Panel';

export default class PanelElements extends React.Component {

    constructor () {
        super(...arguments);
    }

    render () {
        let { types, visible } = this.props;

        return (
            <Panel className="panel-types" extra='地图元素' visible={visible}>
                <ul className="panel-types__list">
                    { this._createMapElements(types) }
                </ul>
            </Panel>
        );
    }

    _createMapElements (types) {
        types = Object.keys(types).map(key => (types[key]));

        return types.map(type => {
            return (
                <li key={type.type} className="panel-types__item">
                    <a 
                        href="javascript:;" 
                        className="panel-types__element" 
                        onMouseDown={e => {
                            this.props.onSelectElement(type);
                        }}
                    >
                        <img className="panel-types__texture" src={type.textures.main || type.textures.left} title={type.type} />
                    </a>
                </li>
            );
        });
    }

}
