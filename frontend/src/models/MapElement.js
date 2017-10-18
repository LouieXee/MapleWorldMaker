import { MapTexture } from 'maple-world';

import { getUniqueId, Events } from '../utils';

const { autoDetectRenderer, Container, Sprite, Rectangle } = PIXI;
const { TextureCache } = PIXI.utils;
const { TilingSprite } = PIXI.extras;

export default class MapElement {

    constructor (element) {
        const {
            type,
            textures,
            ...opts
        } = element;

        this._id = getUniqueId();
        this._x = 0;
        this._y = 0;
        this._type = type;
        this._textures = textures;
        this._properties = { 
            ...opts
        };
        this._mapTexture = new MapTexture(
            this._type, 
            this._handleTextures(this._type, this._textures, this._properties), 
            this._properties
        );
        this._events = new Events();
    }

    onUpdate (callback) {
        this._events.on('update', callback);

        return () => {
            this._events.off('update', callback);
        };
    }

    updateProps (props) {
        this._properties = {
            ...this._properties,
            ...props
        };

        this._mapTexture = new MapTexture(
            this._type,
            this._handleTextures(this._type, this._textures, this._properties),
            this._properties
        )

        this._events.emit('update');
    }

    getProps () {
        return this._properties;
    }

    getCanvas () {
        return this._mapTexture.getCanvas();
    }

    getTexture () {
        return this._mapTexture.getTexture();
    }

    getId () {
        return this._id;
    }

    getType () {
        return this._type;
    }

    getPosition () {
        return {
            x: this._x,
            y: this._y
        };
    }

    setPosition ({x, y}) {
        this._x = x;
        this._y = y;

        return this;
    }

    _handleTextures (type, textures, opt) {
        if (type == 'ground') {
            return {
                ground: TextureCache[textures.main],
                edge: TextureCache[textures.edge]
            };
        } else if (type == 'slope') {
            return {
                slope: TextureCache[textures[opt.dir]]
            };
        } else if (type == 'wall') {
            return {
                wall: TextureCache[textures[opt.dir]]
            };
        }
    }

}
