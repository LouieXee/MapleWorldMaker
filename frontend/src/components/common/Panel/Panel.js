import React from 'react';
import { Icon } from 'antd';

import Dragable from '../Dragable';

export default class Panel extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            dragable: false
        };
    }

    render () {
        let { className, style, extra, visible = true, children } = this.props;

        style = {
            ...style,
            display: visible ? 'block' : 'none'
        };

        return (
            <Dragable className={className} style={style} dragable={this.state.dragable}>
                <div className="panel">
                    <div 
                        className="panel__header"
                        onMouseMove={() => { 
                            this.setState({ dragable: true }); 
                        }} 
                        onMouseOut={() => { 
                            this.setState({ dragable: false }); 
                        }} 
                    >
                        { extra }
                        <a href="javascript:;" className="panel__close"><Icon type="close" /></a>
                    </div>
                    <div className="panel__body">
                        { children }
                    </div>
                </div>
            </Dragable>
        );
    }

}
