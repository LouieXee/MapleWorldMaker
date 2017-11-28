import React from 'react';

import displayObject from '../../../../res/displayObject.png';
import sprite from '../../../../res/sprite.png';

import Panel from '../../common/Panel';

import MapElement from '../../../models/MapElement';

export default class PanelTypes extends React.Component {

    constructor () {
        super(...arguments);
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (this.props.visible != nextProps.visible) {
            return true;
        }

        return false;
    }

    render () {
        let { types, visible } = this.props;

        return (
            <Panel className="panel-types" extra='地图元素' visible={visible} onClose={this.props.onClose}>
                <ul className="panel-types__list">
                    { this._createMapTiles(types) }
                    <li className="panel-types__item">
                        <a 
                            href="javascript:;" 
                            className="panel-types__element" 
                            onMouseDown={e => {
                                this.props.onDragElement(new MapElement({
                                    type: 'displayObject',
                                    textures: {
                                        preview: displayObject
                                    }
                                }));
                            }}
                        >
                            <img className="panel-types__texture" src={displayObject} title="display_object" />
                        </a>
                    </li>
                    <li className="panel-types__item">
                        <a 
                            href="javascript:;" 
                            className="panel-types__element" 
                            onMouseDown={e => {
                                // this.props.onDragElement(new MapElement(type));
                            }}
                        >
                            <img className="panel-types__texture" src={sprite} title="sprite" />
                        </a>
                    </li>
                </ul>
            </Panel>
        );
    }

    _createMapTiles (types) {
        return types.map(type => {
            return (
                <li key={type.type} className="panel-types__item">
                    <a 
                        href="javascript:;" 
                        className="panel-types__element" 
                        onMouseDown={e => {
                            this.props.onDragElement(new MapElement(type));
                        }}
                    >
                        <img className="panel-types__texture" src={type.textures.main || type.textures.left} title={type.type} />
                    </a>
                </li>
            );
        });
    }

}
