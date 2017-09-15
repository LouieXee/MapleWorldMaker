import React from 'react';

import { noop } from '../../../utils';

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
        let currentPoint = { 
            x: parseFloat(getComputedStyle(dragable).left),
            y: parseFloat(getComputedStyle(dragable).top)
        };

        const handleMouseDown = e => {
            e.preventDefault();

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
            e.preventDefault();

            dragable.style.left = `${currentPoint.x + (e.pageX - firstPoint.x)}px`;
            dragable.style.top = `${currentPoint.y + (e.pageY - firstPoint.y)}px`;

            onDraging(e.pageX, e.pageY);
        };
        const handleMouseUp = e => {
            e.preventDefault();

            currentPoint.x += e.pageX - firstPoint.x;
            currentPoint.y += e.pageY - firstPoint.y;

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
        let { style, className } = this.props;

        style = {
            cursor: !this.state.dragable ? 'default' :  '-webkit-grab',
            transform: 'translateZ(0)',
            ...style
        };

        return (
            <div className={className} ref="dragable" style={style}>
                { this.props.children }
            </div>
        );
    }

}
