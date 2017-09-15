export default class Map {

    constructor (opt = {}) {
        const {
            width,
            height,
            textures
        } = opt;
        const {
            ground,
            edge,
            slopeLeft,
            slopeRight,
            wallLeft,
            wallRight
        } = textures;
        const {
            groundWidth = ground.width,
            groundHeight = ground.height,
            edgeWidth = edge.width,
            slopGroundHeight = slopeLeft.height - wallLeft.height,
            slopeWidth = slopeLeft.width,
            slopeHeight = slopeLeft.height,
            wallHeight = wallLeft.height
        } = opt;

        this._width = width;
        this._height = height;
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
                slopGroundHeight
            },
            slope: {
                type: 'SLOPE',
                textures: {
                    left: slopeLeft,
                    right: slopeRight
                },
                slopeWidth,
                slopeHeight
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

}