import { isNumber } from '../../../../utils';

const { Sprite, Texture, Graphics } = PIXI;
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
        let { _spriteMain, _hover, _element } = this;

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
        let spriteMain = this._element.getTexture(); // 图片资源
        let hover = new Graphics();                  // 鼠标悬浮区域
        let rect = new Graphics();                   // 位置对比区域
        let type = this._element.getType();
        let props = this._element.getProps();

        hover.clear();
        hover.beginFill(0xFF0000, .2);
        hover.drawRect(spriteMain.x, spriteMain.y, spriteMain.children[0].width, spriteMain.children[0].height);
        hover.endFill();
        hover.visible = false;

        rect.clear();
        rect.beginFill(0x00FF00, 0);
        if (type == 'ground') {
            let main = spriteMain.children[0].children[0];

            rect.drawRect(0, 0, main.width, main.height + spriteMain.y);
            rect.x = main.x;
        } else if (type == 'slope') {
            let main = spriteMain.children[0];

            rect.drawRect(0, 0, main.width, main.height);
        } else if (type == 'wall') {
            let main = spriteMain.children[0];

            rect.drawRect(0, 0, 0, main.height);
            rect.y = spriteMain.y;
        }
        rect.endFill();

        this.addChild(spriteMain, hover, rect);
        this._spriteMain = spriteMain;
        this._hover = hover;
        this._rect = rect;
    }

}
