import { getUniqueId } from '../../../../utils';

const { Sprite, Graphics } = PIXI;

export default class SpriteMapLine extends Sprite {

    constructor (opt) {
        super();

        this.x = opt.x;
        this.y = opt.y;
        this._targetX = opt.targetX;
        this._targetY = opt.targetY;
    
        this._id = getUniqueId();
        this._tag = 'lines';

        this._setGraphics();
    }

    getTag () {
        return this._tag;
    }

    _setGraphics () {
        let line = new Graphics();

        line.lineStyle(2, 0xFF0000);
        line.moveTo(0, 0);
        line.lineTo(this._targetX - this.x, this._targetY - this.y);

        this.addChild(line);
    }

}
