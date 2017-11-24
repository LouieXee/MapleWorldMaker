import { isNumber } from '../../../../utils';

const { Sprite, Texture, Graphics } = PIXI;
const { TextureCache, uid } = PIXI.utils;

// 区别点击事件
const DRAG_DELAY = 120;

export default class SpriteMapElement extends Sprite {

    constructor (element, { eventSys }) {
        super();

        this._myUid = uid();

        this._element = element;
        this._spriteMain = new Sprite();
        this._hover = new Graphics();
        this._rect = new Graphics();
        this._eventSys = eventSys;
        this._tag = 'elements';

        this._hover.visible = false;

        this._setTexture();
        this._bind();

        this.addChild(this._spriteMain, this._hover, this._rect);
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

        this._element.setPostion({
            x,
            y
        });

        return this;
    }

    _bind () {
        let timeoutId = 0;
        let { _spriteMain, _hover, _element } = this;

        _spriteMain.interactive = true;
        _spriteMain.cursor = '-webkit-grab';
        _spriteMain
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

        /*
            TODO 即便在父级removeChildren, 但是如果不声明移除所有监听器, 回调仍会被调用, 怀疑会被垃圾回收, 但是未找到哪里还有被使用
        */
        this.on('removed', () => {
            _spriteMain.removeAllListeners();

            this.removeAllListeners();
        })
    }

    _setTexture () {
        this._spriteMain = this._element.getTexture();

        this._hover.clear();
        this._hover.beginFill(0xFF0000, .2);
        this._hover.drawRect(this._spriteMain.x, this._spriteMain.y, this._spriteMain.children[0].width, this._spriteMain.children[0].height);
        this._hover.endFill();

        let element = this._element;
        let rect= this._rect;
        let spriteMain = this._spriteMain;
        let type = element.getType();
        let props = element.getProps();

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
    }

}
