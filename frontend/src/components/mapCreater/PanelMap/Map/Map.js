import SpriteMapElement from './SpriteMapElement';

import { Event } from '../../../../utils';

const { Application } = PIXI;

export default class Map {

    constructor (opt) {
        const {
            width,
            height, 
            view,
            eventSys
        } = opt;

        this._app = new Application({
            width,
            height,
            view
        });
        this._elements = [];
        this._eventSys = eventSys;

        this._tick();
    }

    destroy () {
        this._app.destroy();
    }

    setElements (elements) {
        let { stage } = this._app;

        elements.sort((a, b) => ( a.getProps().zIndex > b.getProps().zIndex ));

        this._elements = elements.map(element => {
            return new SpriteMapElement(element, {
                eventSys: this._eventSys
            })
        });
        stage.removeChildren();

        this._elements.length && stage.addChild(...this._elements);
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
