import { Descriptions, PageHeader } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MainLayout } from "../../components/admin/layout/Layout"
import { refreshToken } from '../../features/authSlice'

const Dashboard = () => {

    // const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useState(() => {
        dispatch(refreshToken())
    },)

    return (
        <MainLayout>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Title"
                    subTitle="This is a subtitle"
                // extra={[
                //     <Button key="3">Operation</Button>,
                //     <Button key="2">Operation</Button>,
                // ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                        <Descriptions.Item label="Remarks">
                            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        </MainLayout>
    )

}

export default Dashboard