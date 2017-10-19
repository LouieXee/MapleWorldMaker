export default class Map {

    constructor (opt = {}) {
        const {
            width,
            height,
            textures,
            groundWidth,
            groundHeight,
            edgeWidth,
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
                size: 1,
                edge: 'none',
                groundWidth,
                groundHeight,
                edgeWidth
            },
            slope: {
                type: 'slope',
                textures: {
                    left: slopeLeft,
                    right: slopeRight
                },
                size: 1,
                dir: 'left',
                slopeWidth,
                slopeHeight,
                slopeLeftValue,
                slopeRightValue,
                groundHeight
            },
            wall: {
                type: 'wall',
                textures: {
                    left: wallLeft,
                    right: wallRight
                },
                size: 1,
                dir: 'left',
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