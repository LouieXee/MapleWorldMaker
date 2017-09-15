import { getUniqueId } from '../utils';

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
        this._properties = { ...rest };
        this._dragable = false;
    }

    getDisplayedTexture () {
        
    }

    getDragable () {
        return this._dragable;                           
    }

    setDragable (dragable) {
        this._dragable = dragable;

        return this;
    }

}
