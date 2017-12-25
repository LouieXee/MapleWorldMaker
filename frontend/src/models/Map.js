import displayObject from '../../res/displayObject.png';
import sprite from '../../res/sprite.png';

export default class Map {

    constructor (opt = {}) {
        
        const {
            width,              // 地图宽度
            height,             // 地图高度
            textures,           // 地图地面 斜坡 墙的图片资源
            groundWidth,        // 默认单位地面宽度
            groundHeight,       // 默认单位地面高度
            edgeWidth,          // 默认地面边缘宽度
            slopeWidth,         // 默认单位斜坡宽度
            slopeHeight,        // 默认单位斜坡高度
            slopeLeftValue,     // 默认左斜坡坡度系数
            slopeRightValue,    // 默认右斜坡坡度系数
            wallHeight          // 默认墙面高度
        } = opt;

        const {
            ground,
            edge,
            slopeLeft,
            slopeRight,
            wallLeft,
            wallRight
        } = textures;

        this._width = width;
        this._height = height;
        this._textures = {
            ...textures,
            displayObject,
            sprite
        };
        this._types = [
            {
                type: 'ground',
                textures: {
                    main: ground,
                    edge
                },
                groundWidth,
                groundHeight,
                edgeWidth
            },
            {
                type: 'slope',
                textures: {
                    left: slopeLeft,
                    right: slopeRight
                },
                slopeWidth,
                slopeHeight,
                slopeLeftValue,
                slopeRightValue,
                groundHeight
            },
            {
                type: 'wall',
                textures: {
                    left: wallLeft,
                    right: wallRight
                },
                wallHeight,
                groundHeight
            },
            {
                type: 'displayObject',
                textures: { main: displayObject }
            },
            {
                type: 'sprite', 
                textures: { main: sprite }
            }
        ];
    }

    getWidth () {
        return this._width;
    }

    getHeight () {
        return this._height;
    }

    getTypes () {
        return this._types;
    }

    getTextures () {
        return this._textures;
    }

}