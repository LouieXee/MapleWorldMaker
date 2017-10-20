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
            zIndex: 0,
            ...opts
        };

        this._mapTexture = new MapTexture(
            this._type, 
            this._handleTextures(this._type, this._textures, this._properties), 
            this._properties
        );
        this._events = new Events();
    }

    getTexture () {
        return this._mapTexture;
    }

    onUpdate (callback) {
        this._events.on('update', callback);

        return () => {
            this._events.off('update', callback);
        };
    }

    setProps (props) {
        this._properties = {
            ...this._properties,
            ...props
        };

        this._mapTexture = new MapTexture(
            this._type,
            this._handleTextures(this._type, this._textures, this._properties),
            this._properties
        );

        this._events.emit('update');
    }

    getProps () {
        return this._properties;
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

    /*
        @description 
            一. 因为图像和逻辑需要, 拖拽得到的坐标和图像显示的坐标是有一定的偏移的;
            二. 为了保证鼠标拖拽过程中, 保证拖拽效果, 所以偏移逻辑没有在MapTexture中处理
    */
    setPosition ({x, y}) {
        switch (this._type) {
            case 'ground':
                this._x = x;
                this._y = y + (this._properties.groundHeight - this._mapTexture.children[0].height);
                break;
            case 'wall':
                this._y = y - this._properties.groundHeight;
                if (this._properties.dir == 'left') {
                    this._x = x + this._mapTexture.children[0].width;
                } else {
                    this._x = x;
                }
                break;
            default:
                this._x = x;
                this._y = y;
        }

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
