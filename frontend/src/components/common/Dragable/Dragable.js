import React from 'react';

import { noop } from '../../../utils';

const TRANSFORM_TRANSLATE3D_REG_EXP = /translate3d\((-?\d+)px[\w\s]*(-\d+)px[\w\s]*\)/;

export default class Dragable extends React.Component {

    constructor (props) {
        super(props);

        let {
            dragable = true
        } = props;

        this.state = {
            dragable
        };
    }

    componentWillReceiveProps (nextProps) {
        let { dragable = true } = nextProps;

        this.setState({
            dragable
        });
    }

    componentDidMount () {
        let { dragable } = this.refs;
        let { onDrag = noop, onDraging = noop, onDrop = noop } = this.props;
        let firstPoint = { x: 0, y: 0 };
        let currentPoint = { x: 0, y: 0 };

        const handleMouseDown = e => {
            if (!this.state.dragable) {
                return false;
            }

            firstPoint.x = e.pageX;
            firstPoint.y = e.pageY;

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            onDrag(firstPoint.x, firstPoint.y);
        };
        const handleMouseMove = e => {
            currentPoint.x = e.pageX;
            currentPoint.y = e.pageY;

            

            dragable.style.transform = `translate3d(${currentPoint.x - firstPoint.x}px, ${currentPoint.y - firstPoint.y}px, 0)`;

            onDraging(currentPoint.x, currentPoint.y);
        };
        const handleMouseUp = e => {
            onDrop(e.pageX, e.pageY); 

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        dragable.addEventListener('mousedown', handleMouseDown);

        this._removeDragableListener = () => {
            dragable.removeEventListener('mousedown', handleMouseDown)
        };
    }

    componentWillUnmount () {
        if (this._removeDragableListener) {
            this._removeDragableListener();
            this._removeDragableListener = null;
        }
    }

    render () {
        let { className, style } = this.props;
        let dragableStyle = {
            cursor: !this.state.dragable ? 'default' : ( this.state.draging ? '-webkit-grabbing' : '-webkit-grab' ),
            ...style
        };

        return (
            <div ref="dragable" className={className} style={dragableStyle}>
                { this.props.children }
            </div>
        );
    }

}
