const { Sprite, Texture, Graphics } = PIXI;
const { TextureCache } = PIXI.utils;

export default class SpriteMapElement extends Sprite {

    constructor (element, { eventSys }) {
        super();

        this.interactive = true;
        this.cursor = '-webkit-grab';

        this._element = element;
        this._eventSys = eventSys;

        this._bind();
        this._setTexture();
    }

    update () {
        let pos = this._element.getPosition();

        this.x = pos.x;
        this.y = pos.y;
    }

    _bind () {
        this.on('mousedown', e => {
            this._eventSys.emit('drag', this._element);
        })

        this.on('mouseup', e => {
            this._eventSys.emit('select', this._element);
        })
    }

    _setTexture () {
        let rect = new Graphics();
        let texture = this._element.getTexture();

        rect.lineStyle(1, 0xFF0000);
        rect.drawRect(0, 0, texture.width, texture.height);

        this.addChild(new Sprite(texture));
    }

}
