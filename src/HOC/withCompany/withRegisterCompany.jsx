import { Button, Input, Space, Form, Alert, notification } from 'antd';

import React from "react";
import eventEmitter from "../../Services/EventEmitter";

const withRegisterCompany = (WrapedComponent, { handlerAPI, resource }, prop) => {
    class WithRegisterCompanyProfile extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                error: { status: false, message: '', descriptions: '' }
            }
        }

        componentDidMount() {
            // this.setState({
            //     data: [
            //         { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
            //         { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
            //     ]
            // })
        }

        onFinish = async (data) => {
            this.setState({ loading: true, error: { status: false, message: '', descriptions: '' } })
            await handlerAPI.post(`${resource}/`, data)
                .then(res => {
                    console.log(res)
                    data = ''
                    this.openNotification({ message: res.message })
                    eventEmitter.emit('updateQualityControllers')
                    eventEmitter.emit('closeModal')
                    // handleOk()
                })
                .catch(err => {
                    console.log(err)
                    // setError({ status: true, message: err.message, descriptions: err.descriptions })
                    this.setState({ error: { status: true, message: err.message, descriptions: err.descriptions } })
                })
                .finally(() => this.setState({ loading: false }))
        };

        onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        openNotification = ({ message, description = '' }) => {
            notification.success({
                message,
                description,
                placement: 'bottomLeft'
            });
        };

        render() {
            const layout = {
                labelCol: {
                    span: 6,
                },
                wrapperCol: {
                    // span: 16,
                },
            };
            const tailLayout = {
                wrapperCol: {
                    offset: 13,
                    // span: 16,
                },
            };
            return (
                <>
                    <WrapedComponent
                        onFinishFailed={this.onFinishFailed}
                        onFinish={this.onFinish}
                        loading={this.state.loading}
                        error={this.state.error}
                    />
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}>
                        <Form.Item
                            label="Company Name"
                            name="name"
                            rules={[{ required: true, message: "Please input User's First Name!" }]}>
                            <Input placeholder='Enter Manufacturing Company Name' />
                        </Form.Item>
                        <Form.Item
                            label="Registration No"
                            name="regno"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phonenumber"
                            rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[{ required: true, message: 'Please input your location!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Space size='middle' direction='horizontal'>
                                <Button type="ghost" htmlType="reset" >
                                    Clear Inputs
                                </Button>
                                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                        {this.state.error.status &&
                            <Alert
                                message={this.state.error.message}
                                description={this.state.error.descriptions}
                                type="error"
                            />
                        }
                    </Form>
                </>
            );
        }
    }
    return WithRegisterCompanyProfile;
};

export default withRegisterCompany;
