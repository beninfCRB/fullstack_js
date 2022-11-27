import { Descriptions } from 'antd'
import React from 'react'
import { MainLayout } from "../../components/admin/layout/Layout"

const Dashboard = () => {

    return (
        <MainLayout>
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                <Descriptions.Item label="Remarks">
                    Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
        </MainLayout>
    )

}

export default Dashboard