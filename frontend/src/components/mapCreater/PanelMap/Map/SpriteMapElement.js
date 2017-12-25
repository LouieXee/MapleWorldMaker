import { isNumber } from '../../../../utils';

const { Container, Sprite, Texture, Graphics } = PIXI;
const { TextureCache, uid } = PIXI.utils;

// 区别点击事件
const DRAG_DELAY = 120;

export default class SpriteMapElement extends Sprite {

    constructor (element, { eventSys }) {
        super();

        this._element = element;
        this._eventSys = eventSys;
        this._tag = 'elements';

        this._setTexture();
        this._bind();
    }

    update () {
        let pos = this._element.getPosition();

        this.x = pos.x;
        this.y = pos.y;
    }

    getId () {
        return this._element.getId();
    }

    getTag () {
        return this._tag;
    }

    getRect () {
        return this._rect;
    }

    /*
        @description 依据对比矩形的坐标, 得出当前地图元素的坐标
    */
    setRectPos (pos) {
        let x = this.x;
        let y = this.y;

        if (isNumber(pos.x)) {
            x = pos.x - this._rect.x;
        }

        if (isNumber(pos.y)) {
            y = pos.y - this._rect.y;
        }

        this.x = x;
        this.y = y;

        this._element.setPosition({
            x,
            y
        });

        return this;
    }

    _bind () {
        let timeoutId = 0;
        let { _hover, _element } = this;

        this.interactive = true;
        this.cursor = '-webkit-grab';
        this
        .on('mousedown', e => {
            timeoutId = setTimeout(() => {
                this._eventSys.emit('drag', this._element);
            }, DRAG_DELAY)
        })
        .on('mouseup', e => {
            clearTimeout(timeoutId);

            this._eventSys.emit('select', this._element);
        })
        .on('mouseover', e => {
            _hover.visible = true;
        })
        .on('mouseout', e => {
            _hover.visible = false;
        })
    }

    _setTexture () {
        let texture = this._element.getTexture();     // 图片资源
        let rect = this._element.getRectToCompared(); // 获取比较区域用的矩形
        let hover = new Graphics();                   // 鼠标悬浮区域

        let tempHover = new Container();
        tempHover.addChild(texture);

        hover.clear();
        hover.beginFill(0xFF0000, .2);
        hover.drawRect(texture.x, texture.y, tempHover.width, tempHover.height);
        hover.endFill();
        hover.visible = false;

        this.addChild(texture, hover, rect);
        this._elementTexture = texture;
        this._hover = hover;
        this._rect = rect;
    }

}
