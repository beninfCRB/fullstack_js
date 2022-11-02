import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const Auth = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/login', {
                username: username,
                password: password
            })
            navigate('/dashboard')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <h1 className='title is-2'>Sign In</h1>
                            <form onSubmit={Auth} className='box'>
                                {msg !== '' ? <p className='has-text-centered'>{msg}</p> : ''}
                                <div className="field mt-5">
                                    <label htmlFor="" className="label">Username</label>
                                    <div className="control">
                                        <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="label">Password</label>
                                    <div className="control">
                                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button type='submit' className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login