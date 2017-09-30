export default class Map {

    constructor (opt = {}) {
        const {
            width,
            height,
            textures,
            groundWidth,
            groundHeight,
            edgeWidth,
            slopeGroundHeight,
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
                type: 'ground',
                textures: {
                    main: ground,
                    edge
                },
                groundWidth,
                groundHeight,
                edgeWidth,
                deltaOfGroundAndSlope: slopeGroundHeight - groundHeight
            },
            slope: {
                type: 'slope',
                textures: {
                    left: slopeLeft,
                    right: slopeRight
                },
                slopeWidth,
                slopeHeight,
                slopeLeftValue,
                slopeRightValue,
                slopeGroundHeight
            },
            wall: {
                type: 'wall',
                textures: {
                    left: wallLeft,
                    right: wallRight
                },
                wallHeight,
                groundHeight
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