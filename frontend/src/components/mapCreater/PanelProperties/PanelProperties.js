import React from 'react';
import { Form, Button, InputNumber, Radio } from 'antd';

import Panel from '../../common/Panel';
import FormItem from '../../common/FormItem';

const { Group } = Radio;

class PanelProperties extends React.Component {

    constructor () {
        super(...arguments);

        this.state = {
            element: null
        };
    }

    componentDidMount () {
        this._locatePanel();
    }

    componentWillReceiveProps (nextProps) {
        let currentElement = this.state.element;
        let nextElement = nextProps.element;

        if (!this.props.visible && nextProps.visible) {
            this._locatePanel();
        }

        if ((!currentElement && nextElement)
         || (currentElement && nextElement && currentElement.getId () != nextElement.getId())) {
            this.setState({
                element: nextElement
            }, () => {
                let { edge, size, dir } = nextElement.getProps();

                switch (nextElement.getType()) {
                    case 'ground':
                        return this.props.form.setFieldsValue({
                            edge,
                            size 
                        });
                    case 'slope':
                        return this.props.form.setFieldsValue({
                            dir,
                            size 
                        });
                    case 'wall':
                        return this.props.form.setFieldsValue({
                            dir,
                            size 
                        });
                }
            })
        }
    }

    render () {
        let { element, visible } = this.props;

        return (
            <Panel ref="panel" className="panel-props" extra="元素属性" visible={visible} onClose={this.props.onClose}>
                <div className="panel-props__wrapper">
                    { this._renderForm() }
                    <div className="common__mt12 common__tc">
                        <Button type="primary" onClick={this._handleUpdateElementProps.bind(this)}>保存</Button>
                    </div>
                </div>
            </Panel>
        );
    }

    _locatePanel () {
        let panel = this.refs.panel.refs.panel;

        panel.style.top = '2px';
        panel.style.left = `${window.innerWidth - parseInt(getComputedStyle(panel).width) - 2}px`;
    }

    _handleUpdateElementProps () {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return err;
            }

            this.state.element.updateProps(values);
        })
    }

    _renderForm () {
        let { element } = this.state;

        if (!element) {
            return null;
        }

        switch (element.getType()) {
            case 'ground':
                return this._renderFormGround();
            case 'slope':
                return this._renderFormSlope();
            case 'wall':
                return this._renderFormWall();
        }
    }

    _renderFormGround () {
        let { getFieldDecorator } = this.props.form;

        return (
            <Form className="panel-props__form">
                <FormItem label="地面尺寸">
                    {
                        getFieldDecorator('size', {
                            rules: [{
                                required: true,
                                message: '地面尺寸不能为空!'
                            }]
                        })(
                            <InputNumber placeholder="请输入地面尺寸" />
                        )
                    }
                </FormItem>
                <FormItem label="边缘类型">
                    {
                        getFieldDecorator('edge', {
                            rules: [{
                                required: true,
                                message: '请选择边缘类型!'
                            }]
                        })(
                            <Group>
                                <Radio value="left">左边缘</Radio>
                                <Radio value="right">右边缘</Radio>
                                <Radio value="both">两侧边缘</Radio>
                                <Radio value="none">无边缘</Radio>
                            </Group>
                        )
                    }
                </FormItem>
            </Form>
        );
    }

    _renderFormSlope () {
        let { getFieldDecorator } = this.props.form;

        return (
            <Form className="panel-props__form">
                <FormItem label="斜坡尺寸">
                    {
                        getFieldDecorator('size', {
                            rules: [{
                                required: true,
                                message: '斜坡尺寸不能为空!'
                            }]
                        })(
                            <InputNumber placeholder="请输入斜坡尺寸" />
                        )
                    }
                </FormItem>
                <FormItem label="斜坡朝向">
                    {
                        getFieldDecorator('dir', {
                            rules: [{
                                required: true,
                                message: '请选择斜坡朝向!'
                            }]
                        })(
                            <Group>
                                <Radio value="left">向左</Radio>
                                <Radio value="right">向右</Radio>
                            </Group>
                        )
                    }
                </FormItem>
            </Form>
        );
    }

    _renderFormWall () {
        let { getFieldDecorator } = this.props.form;

        return (
            <Form className="panel-props__form">
                <FormItem label="墙面尺寸">
                    {
                        getFieldDecorator('size', {
                            rules: [{
                                required: true,
                                message: '墙面尺寸不能为空!'
                            }]
                        })(
                            <InputNumber placeholder="请输入墙面尺寸" />
                        )
                    }
                </FormItem>
                <FormItem label="墙面朝向">
                    {
                        getFieldDecorator('dir', {
                            rules: [{
                                required: true,
                                message: '请选择墙面朝向!'
                            }]
                        })(
                            <Group>
                                <Radio value="left">向左</Radio>
                                <Radio value="right">向右</Radio>
                            </Group>
                        )
                    }
                </FormItem>
            </Form>
        );
    }

}

export default Form.create()(PanelProperties);
