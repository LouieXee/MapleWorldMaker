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

    /*
        @description 拖拽得到的坐标转化为实际在地图中的准确坐标
            一. 因为图像和逻辑需要, 拖拽得到的坐标和图像显示的坐标是有一定的偏移的;
            二. 为了保证鼠标拖拽过程中的拖拽效果, 所以偏移逻辑没有在MapTexture中处理
            三. 所有的坐标取整
    */
    setPosFromDragPos ({x, y}) {
        x = Math.round(x);
        y = Math.round(y);

        this._y = y - this._texture.y;
        this._x = x - this._texture.x;

        return this;
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
                this._texture = new MapTexture(this._type, { slope: TextureCache[this._properties.textures[this._properties.dir]] }, this._properties);
                break;
            case 'wall':
                this._texture = new MapTexture(this._type, { wall: TextureCache[this._properties.textures[this._properties.dir]] }, this._properties);
                break;
            case 'displayObject':
                this._texture = new Container();
                this._texture.addChild(new Sprite(TextureCache[this._properties.textures['preview']]));
                break;
            case 'sprite':
        }

        this._texture.renderCanvas(new CanvasRenderer({
            width: this._texture.children[0].width,
            height: this._texture.children[0].height,
            view: this._canvasCache,
            transparent: true
        }));
    }

}
