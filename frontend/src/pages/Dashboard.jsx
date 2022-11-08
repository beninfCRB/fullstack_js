import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainLayout } from "../components/Layout"
import { refreshToken } from '../features/authSlice'

const Dashboard = () => {

    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useState(() => {
        dispatch(refreshToken())
    },)

    return (
        <MainLayout>
            {token}
        </MainLayout>
    )

}

export default Dashboard