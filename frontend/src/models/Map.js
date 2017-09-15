export default class Map {

    constructor (imgs, opt = {}) {
        const {
            ground,
            edge,
            slopeLeft,
            slopeRight,
            wallLeft,
            wallRight
        } = imgs;
        const {
            groundWidth = ground.width,
            groundHeight = ground.height,
            edgeWidth = edge.width,
            slopGroundHeight = slopeLeft.height - wallLeft.height,
            slopeWidth = slopeLeft.width,
            slopeHeight = slopeLeft.height,
            wallHeight = wallLeft.height
        } = opt;

        this._elements = {
            ground: {
                type: 'GROUND',
                imgs: {
                    main: ground,
                    edge
                },
            },
            slope: {
                type: 'SLOPE',
                imgs: {
                    left: slopeLeft,
                    right: slopeRight
                }
            },
            wall: {
                type: 'WALL',
                imgs: {
                    left: wallLeft,
                    right: wallRight
                }
            }
        };
        this._constant = {
            groundWidth,
            groundHeight,
            edgeWidth,
            slopGroundHeight,
            slopeWidth,
            slopeHeight,
            wallHeight
        };
    }

    getElements () {
        return this._elements;
    }

}