import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Col, Layout, Menu, Row, Switch } from 'antd';
import { toast } from "react-toastify";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/authSlice';
import { useEffect } from 'react';
import { update } from '../../../features/themeSlice';

const { Header, Sider, Content, Footer } = Layout;


export const MainLayout = ({ children }) => {
    const { user } = useSelector((state) => state.auth)
    const {themeBackground} = useSelector(state=>state.theme)
    const [sw, setSw] = useState('dark');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(logout({ navigate, toast }));
    }

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    })

    const changeTheme = (value) => {
        setSw(value ? 'dark' : 'light')
        dispatch(update({value}))
    };

    return (
        <React.Fragment>
            <Layout className='hero is-fullheight is-flex-tablet is-flex-mobile'>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    theme='dark'
                >
                    <div className="logo mt-10" />
                    <Menu
                        className='mt-5'
                        theme='dark'
                        mode="inline"
                        defaultSelectedKeys={['4']}
                        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                            (icon, index) => ({
                                key: String(index + 1),
                                icon: React.createElement(icon),
                                label: `nav ${index + 1}`,
                            }),
                        )}
                    />
                </Sider>
                <Layout className={themeBackground}>
                    <Header
                        className={`site-layout-sub-header-background has-text-white`}
                        style={{ padding: 0 }}
                    >
                        <Row
                            className='is-pulled-right is-flex-mobile'
                        >
                            <Col className='mr-2'>
                                <Switch
                                    checked={sw === 'dark'}
                                    onChange={changeTheme}
                                    checkedChildren="Dark"
                                    unCheckedChildren="Light"
                                />
                            </Col>
                            <Col className='mr-2'>{user && user.username}</Col>
                            <Col className='mr-2'>< Button onClick={clear} type="dashed" shape="round" icon={< LogoutOutlined />} size={'small'} /></Col>
                        </Row>
                    </Header>
                    <Content
                        style={{ margin: '24px 16px 0' }}
                    >
                        <div
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer className={themeBackground} style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </React.Fragment >
    )
}

export default Layout