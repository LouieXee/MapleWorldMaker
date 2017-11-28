import { getUniqueId } from '../../../../utils';

const { Sprite, Graphics } = PIXI;

export default class SpriteMapLine extends Sprite {

    constructor (opt) {
        super();

        // 可能存在辅助线处于画布视野外的情况
        this.x = opt.x < .5 ? 1 : opt.x - .5;
        this.y = opt.y < .5 ? 1 : opt.y - .5;
        this._targetX = opt.targetX < .5 ? 1 : opt.targetX - .5;
        this._targetY = opt.targetY < .5 ? 1 : opt.targetY - .5;

        this._id = getUniqueId();
        this._tag = 'lines';

        this._setGraphics();
    }

    getTag () {
        return this._tag;
    }

    _setGraphics () {
        let line = new Graphics();

        line.lineStyle(1, 0xFF0000);
        line.moveTo(0, 0);
        line.lineTo(this._targetX - this.x, this._targetY - this.y);

        this.addChild(line);
    }

}
