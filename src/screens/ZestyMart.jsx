import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useReducer } from 'react'
import { Row, Col, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, martItems: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export default function ZestyMart() {
    const [{ loading, error, martItems }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        martItems: []
    });

    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const martItem = await axios.get('https://zesty-backend.onrender.com/zestyMart/get-all-martItem');
                dispatch({ type: 'FETCH_SUCCESS', payload: martItem.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch('https://zesty-backend.onrender.com/zestyMart/delete-mart-item', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        })

        if (res.status === 200) {
            toast.dark("Mart item deleted successfully.");
            window.location.reload(true);
        } else if (res.status === 401) {
            toast.dark("Mart item delete failed.");
        }
    }

    const handleShow = (details) => {
        setDetails(details);
        setShowDetails(true);
    }

    return (
        <div className='app'>
            <Sidebar id={2} />
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Header />

                <div style={{ padding: "20px" }}>
                    <Row>
                        <Col md={10}>
                            <h2 style={{ margin: "15px 0 5px 20px" }}>Mart Items</h2>
                        </Col>
                        <Col>
                            <Link to={"/admin/add-mart-item"} className='btn btn-outline-dark mt-4'>Add Mart Item</Link>
                        </Col>
                    </Row>

                    <table className='table mt-5'>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>product Name</th>
                                <th>Details</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        {loading ? <h3>Loading...</h3> : error ? { error } : (
                            <tbody>

                                {martItems.slice(0).reverse().map((martItem, i) => (
                                    <tr key={i} style={{ verticalAlign: "middle" }}>
                                        <td>{martItem._id}</td>
                                        <td><h4>{martItem.name}</h4></td>
                                        <td><button onClick={() => handleShow(martItem)} style={{ textDecoration: "underline", background: "none", padding: 0, width: "100px" }}>Details</button></td>
                                        <td><button className='btn btn-primary'>Update</button></td>
                                        <td><button className='btn btn-danger' onClick={() => handleDelete(martItem._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        )}

                        {details != null &&
                            <Modal show={showDetails} onHide={() => setShowDetails(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{details.restaurantName}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Product Name : <h2 className='ms-3'>{details.name}</h2>
                                    Product Image : <br /><img className='ms-5' src={`https://zesty-backend.onrender.com/zestyMart/get-martItem-image/${details._id}`} alt={details.name} width={250} /><br />
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td>Product Price</td>
                                                <td>{details.price}</td>
                                            </tr>
                                            <tr>
                                                <td>Product Description</td>
                                                <td>{details.description}</td>
                                            </tr>
                                            <tr>
                                                <td>Product Servings(weight)</td>
                                                <td>{details.weight}</td>
                                            </tr>
                                            <tr>
                                                <td>Product Category</td>
                                                <td>{details.category}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>
                                        Close
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}
