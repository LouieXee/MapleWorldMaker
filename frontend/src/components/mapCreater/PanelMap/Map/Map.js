import SpriteMapElement from './SpriteMapElement';
import SpriteMapLine from './SpriteMapLine';

import { Event } from '../../../../utils';

const { Application } = PIXI;

const DISTANCE_TO_ADSORB = 6;
const MORE_LINE_DISTANCE = 20;

export default class Map {

    constructor (opt) {
        const {
            width,
            height, 
            view,
            eventSys
        } = opt;

        this._app = new Application({
            width,
            height,
            view
        });
        this._width = width;
        this._height = height;
        this._elements = [];
        this._dragedElement = null;
        this._eventSys = eventSys;

        this._tick();
    }

    destroy () {
        this._app.destroy();
    }

    setElements (elements) {
        let { stage } = this._app;

        elements.sort((a, b) => ( a.getProps().zIndex > b.getProps().zIndex ));

        this._elements = elements.map(element => {
            return new SpriteMapElement(element, {
                eventSys: this._eventSys
            })
        });
        stage.removeChildren();

        this._elements.length && stage.addChild(...this._elements);
    }

    setDragedElement (element) {
        this._dragedElement = element && this._elements.find(tmp => (tmp.getId() == element.getId()));

        if (!element) {
            this._removeChildrenByTag('lines');
        }
    }

    _removeChildrenByTag (tag) {
        let { stage } = this._app;
        let childrenNeedToRemoved = [];

        for (let child of stage.children) {
            if (child.getTag && child.getTag() == tag) {
                childrenNeedToRemoved.push(child);
            }
        }

        childrenNeedToRemoved.length && stage.removeChild(...childrenNeedToRemoved);
    }

    _tick () {
        const { ticker } = this._app;

        ticker.add(() => {
            this._elements.forEach(element => {
                element.update();
            })

            this._setLinesAndLocateDragedElement();
        })
    }

    _setLinesAndLocateDragedElement () {
        if (!this._dragedElement) {
            return false;
        }

        let lines = [];
        let targets =  [
            ...this._elements.map(element => {
                let tempBounds = element.getRect().getBounds();

                return {
                    id: element.getId(),
                    left: tempBounds.left,
                    right: tempBounds.right,
                    top: tempBounds.top,
                    bottom: tempBounds.bottom,
                    width: tempBounds.width,
                    height: tempBounds.height,
                    x: tempBounds.x,
                    y: tempBounds.y
                };
            }),
            {
                left: 0,
                right: 0,
                top: 0,
                bottom: this._height,
                width: 0,
                height: this._height
            },
            {
                left: this._width,
                right: this._width,
                top: 0,
                bottom: this._height,
                width: 0,
                height: this._height
            }
        ];
        let dragedRectBounds = this._dragedElement.getRect().getBounds();

        // 吸附
        for (let target of targets) {
            if (target.id == this._dragedElement.getId()) {
                continue;
            }

            if (_isAdsorb(dragedRectBounds.left, target.left)) {
                this._dragedElement.setRectPos({
                    x: target.left
                })
            } else if (_isAdsorb(dragedRectBounds.left, target.right)) {
                this._dragedElement.setRectPos({
                    x: target.right
                })
            }

            if (_isAdsorb(dragedRectBounds.right, target.left)) {
                this._dragedElement.setRectPos({
                    x: target.left - dragedRectBounds.width
                })
            } else if (_isAdsorb(dragedRectBounds.right, target.right)) {
                this._dragedElement.setRectPos({
                    x: target.right - dragedRectBounds.width
                })
            }

            if (_isAdsorb(dragedRectBounds.top, target.top)) {
                this._dragedElement.setRectPos({
                    y: target.top
                })
            } else if (_isAdsorb(dragedRectBounds.top, target.bottom)) {
                this._dragedElement.setRectPos({
                    y: target.bottom
                })
            }

            if (_isAdsorb(dragedRectBounds.bottom, target.top)) {
                this._dragedElement.setRectPos({
                    y: target.top - dragedRectBounds.height
                })
            } else if (_isAdsorb(dragedRectBounds.bottom, target.bottom)) {
                this._dragedElement.setRectPos({
                    y: target.bottom - dragedRectBounds.height
                })
            }

        }

        // 添加辅助线
        for (let target of targets) {
            if (target.id == this._dragedElement.getId()) {
                continue;
            }

            if (dragedRectBounds.left == target.left || dragedRectBounds.left == target.right) {
                lines.push(new SpriteMapLine({
                    x: dragedRectBounds.left,
                    y: dragedRectBounds.top < target.top ? dragedRectBounds.top : target.top - MORE_LINE_DISTANCE,
                    targetX: dragedRectBounds.left,
                    targetY: dragedRectBounds.bottom < target.bottom ? target.bottom : dragedRectBounds.bottom + MORE_LINE_DISTANCE
                }))
            }

            if (dragedRectBounds.right == target.left || dragedRectBounds.right == target.right) {
                lines.push(new SpriteMapLine({
                    x: dragedRectBounds.right,
                    y: dragedRectBounds.top < target.top ? dragedRectBounds.top : target.top - MORE_LINE_DISTANCE,
                    targetX: dragedRectBounds.right,
                    targetY: dragedRectBounds.bottom < target.bottom ? target.bottom : dragedRectBounds.bottom + MORE_LINE_DISTANCE
                }))
            }

            if (dragedRectBounds.top == target.top || dragedRectBounds.top == target.bottom) {
                lines.push(new SpriteMapLine({
                    x: dragedRectBounds.left < target.left ? dragedRectBounds.left : target.left - MORE_LINE_DISTANCE,
                    y: dragedRectBounds.top,
                    targetX: dragedRectBounds.right < target.right ? target.right : dragedRectBounds.right + MORE_LINE_DISTANCE,
                    targetY: dragedRectBounds.top
                }))
            }

            if (dragedRectBounds.bottom == target.top || dragedRectBounds.bottom == target.bottom) {
                lines.push(new SpriteMapLine({
                    x: dragedRectBounds.left < target.left ? dragedRectBounds.left : target.left - MORE_LINE_DISTANCE,
                    y: dragedRectBounds.bottom,
                    targetX: dragedRectBounds.right < target.right ? target.right : dragedRectBounds.right + MORE_LINE_DISTANCE,
                    targetY: dragedRectBounds.bottom
                }))
            }           
        }

        this._removeChildrenByTag('lines');
        lines.length && this._app.stage.addChild(...lines);

        function _isAdsorb (posA, posB) {
            return Math.abs(posA - posB) <= DISTANCE_TO_ADSORB;
        }
    }

}
