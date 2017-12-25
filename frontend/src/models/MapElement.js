import { MapTexture } from 'maple-world';

import { getUniqueId, Events } from '../utils';

const { CanvasRenderer, Container, Sprite, Rectangle } = PIXI;
const { TextureCache } = PIXI.utils;
const { TilingSprite } = PIXI.extras;

export default class MapElement {

    constructor (element) {
        const {
            type,
            ...props
        } = element;

        this._id = getUniqueId();
        this._x = -9999;
        this._y = -9999;
        this._texture = null;
        this._canvasCache = document.createElement('canvas');
        this._type = type;
        this._properties = {
            zIndex: 0,
            ...this._initDefaultProps(props)
        };

        this._events = new Events();

        this._createTexture();
    }

    getTexture () {
        return this._texture;
    }

    toDOM () {
        return this._canvasCache;
    }

    setProps (props) {
        this._properties = {
            ...this._properties,
            ...props
        };

        this._createTexture();
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

    setPosition ({x, y}) {
        this._x = x;
        this._y = y;
    }

    _initDefaultProps (props) {
        switch (this._type) {
            case 'ground':
                return {
                    edge: 'none',
                    size: 1,
                    ...props
                };
            case 'wall':
            case 'slope':
                return {
                    dir: 'left',
                    size: 1,
                    ...props
                };
            case 'displayObject':
                return { ...props };
            case 'sprite':
                return { ...props };
        }
    }

    _createTexture () {
        switch (this._type) {
            case 'ground':
                this._texture = new MapTexture(this._type, {
                    ground: TextureCache[this._properties.textures.main],
                    edge: TextureCache[this._properties.textures.edge]
                }, this._properties);
                break;
            case 'slope':
                this._texture = new MapTexture(this._type, { 
                    slope: TextureCache[this._properties.textures[this._properties.dir]] 
                }, this._properties);
                break;
            case 'wall':
                this._texture = new MapTexture(this._type, {
                    wall: TextureCache[this._properties.textures[this._properties.dir]] 
                }, this._properties);
                break;
            case 'sprite':
            case 'displayObject':
                this._texture = new Sprite(TextureCache[this._properties.textures.main]);
                break;
        }

        // 为了能准确访问的宽高而不是缩放比例
        let temp = new Container();

        temp.addChild(this._texture);
        temp.renderCanvas(new CanvasRenderer({
            width: temp.width,
            height: temp.height,
            view: this._canvasCache,
            transparent: true
        }));
    }

}
