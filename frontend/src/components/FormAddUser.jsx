import React from 'react'

const FormAddUser = () => {
    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>Add New User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field mt-5">
                                <label htmlFor="" className="label">Username</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='username' />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="" className="label">Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder='********' />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="" className="label">Email</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Email' />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="" className="label">Email</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select>
                                            <option value="admin">Admin</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field mt-5">
                                <div className="control">
                                    <button className="button is-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddUser