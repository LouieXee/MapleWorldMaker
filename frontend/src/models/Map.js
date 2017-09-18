export default class Map {

    constructor (opt = {}) {
        const {
            width,
            height,
            textures,
            groundWidth,
            groundHeight,
            edgeWidth,
            slopGroundHeight,
            slopeWidth,
            slopeHeight,
            slopeLeftValue,
            slopeRightValue,
            wallHeight
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
        this._textures = textures;
        this._types = {
            ground: {
                type: 'GROUND',
                textures: {
                    main: ground,
                    edge
                },
                groundWidth,
                groundHeight,
                edgeWidth,
                deltaOfGroundAndSlope: slopGroundHeight - groundHeight
            },
            slope: {
                type: 'SLOPE',
                textures: {
                    left: slopeLeft,
                    right: slopeRight
                },
                slopeWidth,
                slopeHeight,
                slopeLeftValue,
                slopeRightValue
            },
            wall: {
                type: 'WALL',
                textures: {
                    left: wallLeft,
                    right: wallRight
                },
                wallHeight
            }
        };
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