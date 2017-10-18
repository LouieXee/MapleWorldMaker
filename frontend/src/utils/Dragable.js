import { Events } from './Events';

export class Dragable {

    constructor (ele, opt = {}) {
        const {
            available = true
        } = opt;

        this.$ele = ele;
        this._available = available;

        this._events = new Events();

        this._bind();
    }

    destroy () {
        this._removeDragableListener && this._removeDragableListener();
    }

    setAvailable (available) {
        this._available = available;

        return this;
    }

    onDrag (callback) {
        this._events.on('drag', callback);

        return this;
    }

    onDraging (callback) {
        this._events.on('draging', callback);

        return this;
    }

    onDrop (callback) {
        this._events.on('drop', callback);

        return this;
    }

    _bind () {
        let $ele = this.$ele;
        let firstPoint = { x: 0, y: 0 };
        let currentPoint = { x: 0, y: 0 };

        const handleMouseDown = e => {
            e.preventDefault();

            if (!this._available) {
                return false;
            }

            firstPoint.x = e.clientX;
            firstPoint.y = e.clientY;

            currentPoint = {
                x: parseFloat(getComputedStyle($ele).left),
                y: parseFloat(getComputedStyle($ele).top)
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            this._events.emit('drag', e.clientX, e.clientY);
        };
        const handleMouseMove = e => {
            e.preventDefault();

            $ele.style.left = `${currentPoint.x + (e.clientX - firstPoint.x)}px`;
            $ele.style.top = `${currentPoint.y + (e.clientY - firstPoint.y)}px`;

            this._events.emit('draging', e.clientX, e.clientY);
        };
        const handleMouseUp = e => {
            e.preventDefault();

            currentPoint.x += e.clientX - firstPoint.x;
            currentPoint.y += e.clientY - firstPoint.y;

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            this._events.emit('drop', e.clientX, e.clientY);
        };

        $ele.addEventListener('mousedown', handleMouseDown);

        this._removeDragableListener = () => {
            $ele.removeEventListener('mousedown', handleMouseDown);
        };
    }

}