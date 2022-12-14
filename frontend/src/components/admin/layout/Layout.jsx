import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Col, Image, Layout, Menu, PageHeader, Row, Switch } from 'antd';
import { toast } from "react-toastify";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, refreshToken } from 'features/authSlice';
import { update } from 'features/themeSlice';


const { Header, Sider, Content, Footer } = Layout;


export const MainLayout = ({ children }) => {
    const { user, isLoading } = useSelector((state) => state.auth)
    const { themeBackground, themeContent, theme } = useSelector(state => state.theme)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const clear = () => {
        dispatch(logout({ navigate, toast }));
    }

    useState(() => {
        dispatch(refreshToken())
    },)

    const changeTheme = (value) => {
        dispatch(update({ value }))
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
                <Layout className={[themeBackground, 'has-text-dark']}>
                    <Header
                        className={[themeBackground === 'site-layout-background' ? `has-background-white has-text-black` : `site-layout-sub-header-background has-text-light`]}
                        style={{ padding: 0 }}
                    >
                        <Image src='' />
                        <Row
                            className='is-pulled-right is-flex-mobile'
                        >
                            <Col className='mr-2'>
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={changeTheme}
                                    checkedChildren="Dark Mode"
                                    unCheckedChildren="Light Mode"
                                />
                            </Col>
                            <Col className='mr-2'>{user && user.username}</Col>
                            <Col className='mr-2'>< Button loading={isLoading} onClick={clear} type="dashed" shape="round" icon={< LogoutOutlined />} size={'small'} /></Col>
                        </Row>
                    </Header>
                    <Content
                        className='has-text-light'
                        style={{ margin: '24px 16px 0' }}
                    >
                        <div
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            <PageHeader
                                className={themeContent}
                                ghost={false}
                                onBack={() => window.history.back()}
                                title="Dashboard"
                            // extra={[
                            //     <Button key="3">Operation</Button>,
                            //     <Button key="2">Operation</Button>,
                            // ]}
                            >
                                {children}
                            </PageHeader>
                        </div>
                    </Content>
                    <Footer className={themeBackground} style={{ textAlign: 'center' }}>Ant Design ??2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </React.Fragment >
    )
}

export default Layout