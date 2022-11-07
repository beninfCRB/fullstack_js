import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from '../features/authSlice.js';

const initialState = {
    username: '',
    password: ''
}

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { username, password } = useState(formValue);
    // const { isSuccess } = useSelector((state) => state.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValue) {
            dispatch(login({ formValue, navigate, toast }));
        }
    }

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-3">
                            <form onSubmit={handleSubmit} className='box'>
                                <h1 className='title is-4 has-text-black has-text-centered'>Sign In</h1>
                                <div className="field mt-5">
                                    <label htmlFor="" className="label">Username</label>
                                    <div className="control">
                                        <input type="text" name='username' className="input" value={username} onChange={onInputChange} placeholder='username' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="label">Password</label>
                                    <div className="control">
                                        <input type="password" name='password' className="input" value={password} onChange={onInputChange} placeholder='********' />
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