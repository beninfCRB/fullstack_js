import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { logout } from 'features/authSlice';
import { toast } from 'react-toastify'



const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(logout({ navigate, toast }))
    }

    return (
        <div>
            <aside className="menu pl-2 has-shadow is-mobile">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li>
                        <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/products"}>Product</NavLink>
                    </li>
                </ul>
                <p className="menu-label">
                    Administration
                </p>
                <ul className="menu-list">
                    <li>
                        <NavLink to={"/users"}>Users</NavLink>
                    </li>
                </ul>
                <p className="menu-label">
                    Settings
                </p>
                <ul className="menu-list">
                    <li>
                        <button onClick={clear} className='button is-white'>Logout</button>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar