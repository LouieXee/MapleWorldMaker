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
        this._x = -9999;
        this._y = -9999;
        this._type = type;
        this._textures = textures;
        this._properties = { 
            zIndex: 0,
            ...opts
        };

        this._events = new Events();
    }

    getTexture () {
        return new MapTexture(
            this._type, 
            this._handleTextures(this._type, this._textures, this._properties), 
            this._properties
        );;
    }

    setProps (props) {
        this._properties = {
            ...this._properties,
            ...props
        };
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

    setPostion ({x, y}) {
        this._x = x;
        this._y = y;
    }

    /*
        @description 拖拽得到的坐标转化为实际在地图中的准确坐标
            一. 因为图像和逻辑需要, 拖拽得到的坐标和图像显示的坐标是有一定的偏移的;
            二. 为了保证鼠标拖拽过程中的拖拽效果, 所以偏移逻辑没有在MapTexture中处理
            三. 所有的坐标取整
    */
    setPosFromDragPos ({x, y}) {
        x = Math.round(x);
        y = Math.round(y);

        let mapTexture = new MapTexture(
            this._type,
            this._handleTextures(this._type, this._textures, this._properties),
            this._properties
        );

        this._y = y - mapTexture.y;
        this._x = x - mapTexture.x;

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
