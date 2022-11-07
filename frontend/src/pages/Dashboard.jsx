import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from "../components/Layout"
import { refreshToken } from '../features/authSlice'

const Dashboard = () => {

    const { token } = useSelector((state) => state.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useState(() => {
    //     dispatch(refreshToken({ navigate }))
    // }, [])

    return (
        <MainLayout>
            {token}
        </MainLayout>
    )

}

export default Dashboard