import SpriteMapElement from './SpriteMapElement';

const { Application } = PIXI;

export default class Map {

    constructor (opt) {
        const {
            width,
            height, 
            view
        } = opt;

        this._app = new Application({
            width,
            height,
            view
        });
        this._elements = [];

        this._tick();
    }

    destroy () {
        this._app.destroy();
    }

    setElements (elements) {
        let { stage } = this._app;

        this._elements = elements.map(element => {
            return new SpriteMapElement(element);
        });
        stage.removeChildren();
        stage.addChild(...this._elements);
    }

    _tick () {
        const { ticker } = this._app;

        ticker.add(() => {
            this._elements.forEach(element => {
                element.update();
            })
        })
    }

}
