// import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../features/authSlice';

// import { useNavigate } from 'react-router-dom';
// import jwt_decode from "jwt-decode";
// import * as api from '../app/api.js'



const Wellcome = () => {

    // const [token, setToken] = useState('')
    // const [expire, setExpire] = useState('')

    // const navigate = useNavigate();

    const { token } = useSelector((state) => state.token)

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // useState(() => {
    //     dispatch(refreshToken({ navigate }))
    // }, [])

    // const refreshToken = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/token')
    //         setToken(response.data.accessToken)
    //         const decoded = jwt_decode(response.data.accessToken)
    //         setExpire(decoded.exp)
    //     } catch (error) {
    //         if (error.response) {
    //             navigate('/')
    //         }
    //     }
    // }

    // axios.interceptors.request.use(async (config) => {
    //     const currentDate = new Date();
    //     if (expire * 1000 < currentDate.getTime()) {
    //         const response = await api.token()
    //         config.headers.Authorization = `Bearer ${response.data.accessToken}`
    //         setToken(response.data.accessToken)
    //         const decoded = jwt_decode(response.data.accessToken)
    //         setExpire(decoded.exp)
    //     }
    //     return config;
    // }, (error) => {
    //     return Promise.reject(error)

    console.log(token)
    // })


    return (
        <div>

            <h1 className='title'>Dashboard</h1>
            <h2 className='subtitle'>Wellcome Back</h2>
        </div>
    )
}

export default Wellcome