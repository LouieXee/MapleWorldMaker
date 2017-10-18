import React from 'react';
import { Form } from 'antd';

const { Item } = Form;

export default class FormItem extends React.Component {
    render () {
        let itemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        };
        let props = {
            hasFeedback: true,
            ...itemLayout,
            ...this.props
        };

        return (
            <Item {...props}>{ this.props.children }</Item>
        );
    }
}
