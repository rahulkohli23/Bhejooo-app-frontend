import axios from 'axios';
import { Formik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import { Table, Toast } from "react-bootstrap";

const API_URL = process.env.API_URL || 'https://api.bhejooo.com';
export const SHIPPING_RATE = `${API_URL}/calculator/shiping-rate`;

const Calculator = () => {
    const [toast, setToast] = useState(false);
    const [failtoast, setFailToast] = useState(false);
    const [courier, setCourier] = useState();
    const navigate = () => {
        setToast(false);
        setFailToast(false);
    }
    return (
        <>
            <div className="topBar">
                <h2>Calculator</h2>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Calculator form</h4>

                            <Formik
                                initialValues={{}}
                                onSubmit={(values, { setSubmitting }) => {
                                    axios.get(SHIPPING_RATE + '?source=' + values.source + '&destination=' + values.destination + '&payment_type=' + values.payment_mode + '&weight=' + values.weight + '&productValue=' + values.product_price, {
                                        headers: {
                                            'length': values.length,
                                            'width': values.width,
                                            'height': values.height
                                        }
                                    }).then(res => {
                                        setCourier(res.data.rates);
                                        setSubmitting(false);
                                        setToast(true);
                                    }, err => {
                                        setFailToast(true);
                                    })
                                }}
                                render=
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                    <form className="forms-sample row ml-1" onSubmit={handleSubmit}>
                                        <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "flexFlow": "row wrap" }}>
                                            <div className="form-group" style={{ "width": "45%" }}>
                                                <input type="number" name='source' className={`form-control form-control-lg border `}
                                                    id="exampleInputEmail1" placeholder="Source Pin" onChange={handleChange}
                                                // value={email} onChange={e => handleEmail(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                            </div>
                                            <div className="form-group" style={{ "width": "45%" }}>
                                                <input type="number" name='destination' className={`form-control form-control-lg border `}
                                                    id="exampleInputEmail1" placeholder="Pickup Pin" onChange={handleChange}
                                                // value={email} onChange={e => handleEmail(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                            </div>
                                            <div className="form-group" style={{ "width": "30%" }}>
                                                <input type="number" name='length' required className={`form-control form-control-lg border`}
                                                    id="exampleInputUsername1" placeholder="Volumetric Length*" onChange={handleChange}
                                                // value={firstName} onChange={e => handleFirstName(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{firstNameError}</p> */}
                                            </div>
                                            <div className="form-group" style={{ "width": "30%" }}>
                                                <input type="number" name='width' required className={`form-control form-control-lg border`}
                                                    id="exampleInputUsername2" placeholder="Volumetric Width*" onChange={handleChange}
                                                // value={lastName} onChange={e => handleLastName(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{lastNameError}</p> */}
                                            </div>
                                            <div className="form-group" style={{ "width": "30%" }}>
                                                <input type="number" name='height' className={`form-control form-control-lg border `}
                                                    id="exampleInputPassword1" placeholder="Volumetric Height" onChange={handleChange}
                                                // value={password} onChange={e => handlePassword(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{passwordError}</p> */}
                                            </div>
                                            <div className="form-group" style={{ "width": "45%" }}>
                                                <input type="text" name='weight' className={`form-control form-control-lg border `}
                                                    id="exampleInputEmail1" placeholder="Weight(Kgs)" onChange={handleChange}
                                                // value={email} onChange={e => handleEmail(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                            </div>
                                            <div className="form-group" style={{ "width": "45%" }}>
                                                <input type="number" name='product_price' className={`form-control form-control-lg border `}
                                                    id="exampleInputEmail1" placeholder="Produt Price" onChange={handleChange}
                                                // value={email} onChange={e => handleEmail(e)} 
                                                />
                                                {/* <p style={{ "color": "red" }}>{emailError}</p> */}
                                            </div>


                                        </div>


                                        <div className="col-md-12 mb-2" style={{paddingLeft: '0px'}}>
                                            <button type="submit" className="btn btn-primary mr-2" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </div>

                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h4>Courier Partner:</h4>
                <Table className="leader-board" striped hover variant="dark">

                    <tbody>
                        {courier && courier.map(ele => (
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            {/* <input type="radio" className="form-check-input" name="carrier.carrier" id="optionsRadios1" value={ele.carrier} onChange={handleChange} /> */}
                                            <i className="input-helper"></i>
                                            <div style={{ "display": "flex", "flexDirection": "row", "paddingLeft": "10px" }}>
                                                <span className="menu-title" style={{ "paddingLeft": "10px", color: "#FFF" }}>{ele.carrier}</span>
                                            </div>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <span className="menu-icon"><i className="mdi mdi-currency-inr text-success"></i></span>
                                    <span className="menu-title" style={{ "paddingLeft": "10px", color: "#FFF" }}>{ele.rate}</span>
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
            </div>
            {toast && (<Toast onClose={navigate} className="toast-success">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>Processed Sucessfully.</Toast.Body>
            </Toast>
            )}
            {failtoast && (<Toast onClose={navigate} className="toast-danger">
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Failure</strong>
                </Toast.Header>
                <Toast.Body>Process Failed.</Toast.Body>
            </Toast>
            )}
        </>
    )
}

export default Calculator;