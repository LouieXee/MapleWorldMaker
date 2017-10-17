import { MapTexture } from 'maple-world';
import React from 'react';

import { Dragable } from '../../../utils';
import Map from './Map';

const SPACE_KEY_CODE = 32;

const { Application } = PIXI;

export default class PanelMap extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            dragable: false
        };
    }

    componentWillReceiveProps (nextProps) {
        let { elements = [] } = nextProps;

        this._map.setElements(elements);
    }

    componentDidMount () {
        this._setDragableListener();
        this._initMap();
    }

    componentWillUnmount () {
        if (this._removeDragableListener) {
            this._removeDragableListener();
            this._removeDragableListener = null;
        }

        this._map.destroy();
    }

    render () {
        let { width, height, elements } = this.props;

        let style = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width,
            height,
            marginLeft: -width / 2, 
            marginTop: -height / 2,
            cursor: this.state.dragable ? '-webkit-grab' : 'default'
        };

        return (
            <div ref="panel" className="panel-map" style={style}>
                <canvas ref="stage" />
            </div>
        );
    }

    _initMap () {
        let { width, height } = this.props;
        let map = new Map({
            width,
            height,
            view: this.refs.stage
        });

        this._map = map;
    }

    _setDragableListener () {
        const dragable = new Dragable(this.refs.panel, {
            available: false
        })
        const _handleKeyDown = e => {
            if (e.keyCode == SPACE_KEY_CODE) {
                dragable.setAvailable(true);
                this.setState({
                    dragable: true
                })
            }
        };
        const _handleKeyUp = e => {
            if (e.keyCode == SPACE_KEY_CODE) {
                dragable.setAvailable(false);
                this.setState({
                    dragable: false
                })
            }
        };

        document.addEventListener('keydown', _handleKeyDown);
        document.addEventListener('keyup', _handleKeyUp);

        this._removeDragableListener = () => {
            dragable.destroy();
            document.removeEventListener('keydown', _handleKeyDown);
            document.removeEventListener('keyup', _handleKeyUp);
        }
    }

}
