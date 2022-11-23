import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../public/img/logo.png"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice.js';


const Navbar = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clear = () => {
        dispatch(logout({ navigate, toast }))
    }

    const { user } = useSelector((state) => state.auth)

    return (
        <div>
            <nav className="navbar is-fixed-top has-shadow"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <NavLink to="/dashboard" className="navbar-item">
                        <img
                            src={logo}
                            width="150"
                            height="200"
                            alt='logo'
                        />
                    </NavLink>

                    <a
                        href='!#'
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-item">
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={clear} className="button is-light">
                                    Log out
                                </button>
                                {user.username}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar