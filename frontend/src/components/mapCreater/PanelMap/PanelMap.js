import React from 'react';

import MapElement from '../MapElement';

import Dragable from '../../common/Dragable';

const SPACE_KEY_CODE = 32;

export default class PanelMap extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            dragable: false
        }
    }

    componentDidMount () {
        this._setDragableListener();
    }

    componentWillUnmount () {
        if (this._removeDragableListener) {
            this._removeDragableListener();
            this._removeDragableListener = null;
        }
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
            marginTop: -height / 2
        };

        return (
            <Dragable style={style} dragable={this.state.dragable}>
                <div className="panel-map">
                    
                </div>
            </Dragable>
        );
    }

    _setDragableListener () {
        const _handleKeyDown = e => {
            if (e.keyCode == SPACE_KEY_CODE) {
                this.setState({
                    dragable: true
                })
            }
        };
        const _handleKeyUp = e => {
            if (e.keyCode == SPACE_KEY_CODE) {
                this.setState({
                    dragable: false
                })
            }
        };

        document.addEventListener('keydown', _handleKeyDown);
        document.addEventListener('keyup', _handleKeyUp);

        this._removeDragableListener = () => {
            document.removeEventListener('keydown', _handleKeyDown);
            document.removeEventListener('keyup', _handleKeyUp);
        }
    }

    _createMapElements (elements) {
        return elements.map(element => (<MapElement element={element} />))
    }

}
