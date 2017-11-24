import { MapTexture } from 'maple-world';
import React from 'react';

import { Dragable, Events } from '../../../utils';
import Map from './Map';

const SPACE_KEY_CODE = 32;

const { Application } = PIXI;

/*
    @descriptino 该组件是在 canvas 外套一层组件, 封装拖拽逻辑

    @method updateElements
    @method setDragedElement
*/
export default class PanelMap extends React.Component {

    constructor () {
        super(...arguments);

        this._events = new Events();
        this.state = {
            dragable: false
        };
    }

    componentDidMount () {
        this._setDragableListener();
        this._initMap();
        this._bind();
    }

    componentWillUnmount () {
        if (this._removeDragableListener) {
            this._removeDragableListener();
            this._removeDragableListener = null;
        }

        this._map.destroy();
    }

    shouldComponentUpdate () {
        // 目前无需更新, 仅需更新Canvas
        return false;
    }

    render () {
        let { width, height } = this.props;

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
            <div ref={panel => { this.panel = panel; }} className="panel-map" style={style}>
                <canvas ref={stage => { this.stage = stage; }} />
            </div>
        );
    }

    /*
        @description 更新当前所有地图元素
    */ 
    updateElements (elements) {
        this._map.setElements(elements);
    }

    /*
        @description 设置当前拖拽元素
    */ 
    setDragedElement (element) {
        this._map.setDragedElement(element);
    }

    _initMap () {
        let { width, height } = this.props;
        let map = new Map({
            width,
            height,
            view: this.stage,
            eventSys: this._events
        });

        this._map = map;
    }

    _bind () {
        this._events.on('drag', element => {
            this.props.onDragElement(element);
        })

        this._events.on('select', element => {
            this.props.onSelectElement(element);
        })
    }

    _setDragableListener () {
        const dragable = new Dragable(this.panel, {
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
