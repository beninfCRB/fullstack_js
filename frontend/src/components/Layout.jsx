import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Image, Layout, Menu } from 'antd';
import { toast } from "react-toastify";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const { Header, Sider, Content, Footer } = Layout;


export const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(logout({ navigate, toast }));
    }

    return (
        <React.Fragment>
            <Layout
                style={{
                    height: '100vh'
                }}
            >
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <Image
                            width={100}
                            src={'../public/img/logo.jpeg'}
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}

                        <Button onClick={clear} type="primary" shape="round" icon={<LogoutOutlined />} size={'small'} />
                        {user.username}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        GigaJs ©2018 Created by Ant Design
                    </Footer>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

export default Layout