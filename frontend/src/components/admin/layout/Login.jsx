import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { login } from '../../../features/authSlice.js';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const handleSubmit = async (values) => {
        if (values) {
            dispatch(login({ values, navigate, toast }));
        }
    }

    useEffect(() => {
        if (user) {
            window.history.forward()
        }
    })

    return (
        <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered ">
                        <div className="column is-3 is-halfheight">
                            <Form
                                name="normal_login"
                                className="login-form box"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleSubmit}
                            >
                                <div className='has-text-centered m-5'>
                                    <strong className='has-text-info'>SIGN IN</strong>
                                </div>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item className='columns is-centered mb-4 mt-6 is-flex-mobile'>
                                    <Button type="dashed" htmlType="submit" shape='round' className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login