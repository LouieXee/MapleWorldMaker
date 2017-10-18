const { Sprite, Texture, Graphics } = PIXI;
const { TextureCache } = PIXI.utils;

export default class SpriteMapElement extends Sprite {

    constructor (element, { eventSys }) {
        super();

        this._element = element;
        this._spriteMain = new Sprite();
        this._rect = new Graphics();
        this._eventSys = eventSys;

        this._rect.visible = false;

        this._setTexture();
        this._bind();

        this.addChild(this._spriteMain, this._rect);
    }

    update () {
        let pos = this._element.getPosition();

        this.x = pos.x;
        this.y = pos.y;
    }

    _bind () {
        // 区别点击事件
        const DRAG_DELAY = 100;

        let timeoutId = 0;
        let { _spriteMain, _rect, _element } = this;

        const removeUpdateListener = _element.onUpdate(() => {
            this._setTexture();
        });

        this
        .on('removed', () => {
            removeUpdateListener();
        })

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
            _rect.visible = true;
        })
        .on('mouseout', e=> {
            _rect.visible = false;
        })
    }

    _setTexture () {
        let { _rect, _spriteMain } = this;
        let texture = this._element.getTexture();

        _rect.clear();
        _rect.beginFill(0xFF0000, .2);
        _rect.drawRect(0, 0, texture.width, texture.height);
        _rect.endFill();

        _spriteMain.texture = texture;
    }

}
