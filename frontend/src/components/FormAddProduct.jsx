import React from 'react'

const FormAddProduct = () => {
    return (
        <div>
            <h1 className='title'>Products</h1>
            <h2 className='subtitle'>Add New Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field mt-5">
                                <label htmlFor="" className="label">Product Name</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='product name' />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label htmlFor="" className="label">Product Price</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='product price' />
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

export default FormAddProduct