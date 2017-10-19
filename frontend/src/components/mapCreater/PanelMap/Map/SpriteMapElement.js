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
        this._spriteMain = this._element.getTexture();

        this._rect.clear();
        this._rect.beginFill(0xFF0000, .2);
        this._rect.drawRect(this._spriteMain.x, this._spriteMain.y, this._spriteMain.children[0].width, this._spriteMain.children[0].height);
        this._rect.endFill();

        this._setDebugMode();
    }

    _setDebugMode () {
        let element = this._element;
        let type = element.getType();

        if (type == 'ground') {
            let points = [];

            for (let i = 0; i < 4; i++) {
                let point = new Graphics();

                point.beginFill(0xFF0000);
                point.arc(0, 0, 1, 0, 2 * Math.PI);
                point.endFill();

                points.push(point);
            }


        } else if (type == 'slope') {

        } else if (type == 'wall') {

        }
    }

}
