import { MapTexture } from 'maple-world';

import { getUniqueId, Events } from '../utils';

const { CanvasRenderer, Container, Sprite, Rectangle, Graphics } = PIXI;
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
        this._rectToCompared = new Graphics();
        this._canvasCache = document.createElement('canvas');
        this._type = type;
        this._properties = {
            zIndex: 0,
            ...this._initDefaultProps(props)
        };

        this._events = new Events();

        this._createTexture();
        this._createRectToCompared();
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
        this._createRectToCompared();
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

    getRectToCompared () {
        return this._rectToCompared;
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

    /**
     * TODO 获取比较位置的矩形有点生硬, 应该还可以优化
     */
    _createRectToCompared () {
        let texture = this._texture;
        let rect = this._rectToCompared;
        let temp = null;

        rect.clear();
        rect.beginFill(0x00FF00, 0);

        switch (this._type) {
            case 'ground':
                temp = texture.children[0].children[0];

                rect.drawRect(0, 0, temp.width, temp.height + texture.y);
                rect.x = temp.x;
                break;
            case 'slope': 
                temp = texture.children[0];
                rect.drawRect(0, 0, temp.width, temp.height);
                break;
            case 'wall': 
                temp = texture.children[0];
                rect.drawRect(0, 0, 0, temp.height);
                rect.y = texture.y;   
                break;
            case 'displayObject':
            case 'sprite':
                temp = new Container();
                temp.addChild(texture);
                rect.drawRect(0, 0, temp.width, temp.height);
        }

        rect.endFill();
    }

}
