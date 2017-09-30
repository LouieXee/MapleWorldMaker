const { Sprite, Texture } = PIXI;

export default class SpriteMapElement extends Sprite {

    constructor (element) {
        super();

        this._id = element.getId();

        this.addChild(new Sprite(Texture.from(element.getTexture())));
    }

    getId () {
        return this._id;
    }

}
