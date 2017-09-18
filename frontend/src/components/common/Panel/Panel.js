import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';

import { Dragable } from '../../../utils';

export default class Panel extends React.Component {

    componentDidMount () {
        this._dragable = new Dragable(this.refs.panel, {
            available: false
        });
    }

    componentWillUnmount () {
        this._dragable.destroy();
    }

    render () {
        let { 
            className, 
            style, 
            extra, 
            children,
            visible = true
        } = this.props;

        style = {
            ...style,
            display: visible ? 'block' : 'none'
        };

        return (
            <div ref='panel' className={classNames(className, 'panel')} style={style}>
                <div 
                    className="panel__header"
                    onMouseMove={() => { 
                        this._dragable.setAvailable(true); 
                    }} 
                    onMouseOut={() => { 
                        this._dragable.setAvailable(false); 
                    }} 
                >
                    { extra }
                    <a href="javascript:;" className="panel__close"><Icon type="close" /></a>
                </div>
                <div className="panel__body">
                    { children }
                </div>
            </div>
        );
    }

}
