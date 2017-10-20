const { Sprite, Graphics } = PIXI;

export default class SpriteMapLine extends Sprite {

    constructor (opt) {
        super();

        this.x = opt.x;
        this.y = opt.y;
        this._tag = 'lines';

        this._setGraphics();
    }

    getTag () {
        return this._tag;
    }

    _setGraphics () {
        
    }

}
