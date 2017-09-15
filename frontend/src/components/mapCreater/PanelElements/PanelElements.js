import React from 'react';

import Panel from '../../common/Panel';

export default class PanelElements extends React.Component {

    constructor () {
        super(...arguments);
    }

    render () {
        let { map, visible } = this.props;

        return (
            <Panel className="panel-elements" extra='地图元素' visible={visible}>
                <ul className="panel-elements__list">
                    { this._createMapElements(map) }
                </ul>
            </Panel>
        );
    }

    _createMapElements (map) {
        let elements = map.getElements();

        elements = Object.keys(elements).map(key => (elements[key]));

        return elements.map(element => {
            return (
                <li key={element.type} className="panel-elements__item">
                    <a 
                        href="javascript:;" 
                        className="panel-elements__element" 
                        onMouseDown={() => {
                            this.props.onSelectElement(element.type);
                        }}
                    >
                        <img className="panel-elements__texture" src={element.imgs.main || element.imgs.left} title={element.type} />
                    </a>
                </li>
            );
        });
    }

}
