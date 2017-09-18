import { getUniqueId } from '../utils';

const { autoDetectRenderer, Container, Sprite, Rectangle } = PIXI;
const { TextureCache } = PIXI.utils;
const { TilingSprite } = PIXI.extras;

export default class MapElement {

    constructor (element) {
        const {
            type,
            textures,
            ...rest
        } = element;

        this._id = getUniqueId();
        this._type = type;
        this._textures = textures;
        this._properties = { 
            ...rest
        };
        this._textureCache = document.createElement('canvas');
        this._stage = new Container();
        this._renderer = autoDetectRenderer({
            width: 0,
            height: 0,
            view: this._textureCache,
            transparent: true
        });
        this._renderer.autoResize = true;

        this._handleTextureCache();
    }

    getTexture () {
        return this._textureCache;
    }

    getId () {
        return this._id;
    }

    _handleTextureCache () {
        if (this._type == 'GROUND') {
            this._handleGroundTexture();
        } else if (this._type == 'SLOPE') {
            this._handleSlopeTexture();
        } else if (this._type == 'WALL') {
            this._handleWallTexture();
        }
    }

    _handleGroundTexture () {
        let stage = this._stage;
        let renderer = this._renderer;
        let textureMain = TextureCache[this._textures.main].clone();
        let textureEdge = TextureCache[this._textures.edge].clone();
        let {
            size = 1,
            edge = 'none',
            groundWidth,
            groundHeight,
            deltaOfGroundAndSlope,
            edgeWidth
        } = this._properties;
        let width = size * groundWidth + ((edge == 'left' || edge == 'right') && edgeWidth / 2 || edge == 'both' && edgeWidth || 0);
        let height = groundHeight;
        let container = new Container();
        let tiling = new TilingSprite(textureMain, width, textureMain.height);

        renderer.resize(width, height);

        stage.removeChildren();

        container.addChild(tiling) ;
        container.y = deltaOfGroundAndSlope;

        if (edge == 'left') {
            tiling.x = edgeWidth / 2;
            textureEdge.frame = new Rectangle(0, 0, edgeWidth / 2, textureEdge.height);

            container.addChild(new Sprite(textureEdge));
        } else if (edge == 'right') {
            textureEdge.frame = new Rectangle(edgeWidth / 2, 0, edgeWidth / 2, textureEdge.height);

            let edge = new Sprite(textureEdge);
            edge.x = width;

            container.addChild(edge);
        } else if (edge == 'both') {
            let leftTexture = textureEdge.clone();
            let rightTexture = textureEdge.clone();
        
            leftTexture.frame = new Rectangle(0, 0, edgeWidth / 2, textureEdge.height);
            rightTexture.frame = new Rectangle(edgeWidth / 2, 0, edgeWidth / 2, textureEdge.height); 

            tiling.x = edgeWidth / 2;

            let leftEdge = new Sprite(leftTexture);
            let rightEdge = new Sprite(rightTexture);

            rightEdge.x = edgeWidth / 2 + width;
            
            container.addChild(leftEdge);
            container.addChild(rightEdge);
        }

        stage.addChild(container);
        renderer.render(stage);
    }

    _handleSlopeTexture () {}

    _handleWallTexture () {}

}
