import React, { useEffect, useReducer, useState } from 'react'
import Header from '../components/Header'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, categories: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export default function CategoryController() {
    const [{ loading, error, categories }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        categories: []
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const category = await axios.get('https://zesty-backend.onrender.com/category/get-all-category');
                console.log(category.data);

                dispatch({ type: 'FETCH_SUCCESS', payload: category.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        // const res = await axios.delete(`https://zesty-backend.onrender.com/category/delete-category`, { id });
        const res = await fetch('https://zesty-backend.onrender.com/category/delete-category', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        })

        if (res.status === 200) {
            toast.dark("category deleted successfully.");
            window.location.reload(true);
        } else if (res.status === 401) {
            toast.dark("category delete failed.");
        }
    }

    return (
        <div style={{ width: "100%", padding: "20px", margin: "0" }}>
            <Header />
            <Row>
                <Col md={10}>
                    <h2 style={{ margin: "15px 0 5px 20px" }}>Categories</h2>
                </Col>
                <Col>
                    <Link to={"/admin/add-category"} className='btn btn-outline-dark mt-4'>Add Category</Link>
                </Col>
            </Row>

            <table className='table mt-5'>
                <thead>
                    <tr>
                        <th>Category Id</th>
                        <th>Category Name</th>
                        <th>Category Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                {loading ? <h3>Loading...</h3> : error ? { error } : (
                    <tbody>

                        {categories.slice(0).reverse().map((category, i) => (
                            <tr key={i}>
                                <td>{category._id}</td>
                                <td>{category.name}</td>
                                <td><img src={`https://zesty-backend.onrender.com/category/get-category-image/${category._id}`} height={"200px"} alt={category.name} /></td>
                                <td><button className='btn btn-primary'>Update</button></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(category._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    )
}

export function CreateCategory() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {

        const categoryData = new FormData();
        categoryData.append("name", name);
        categoryData.append("image", image);
        try {
            const res = await axios.post("https://zesty-backend.onrender.com/category/add-category", categoryData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            if (res.status === 200) {
                toast.dark("Category Added");
                navigate("/admin/categories");
            } else if (res.status === 401) {
                toast.dark("Category already exist");
            } else if (res.status === 405) {
                toast.dark("category saving failed");
            } else {
                toast.dark("internal server error");
            }
        } catch (error) {
            console.log(error);
            toast.dark("failed to add.")
        }
    }

    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />

            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>Add Category</u></h3>

                    <form>
                        <div className="form-floating mt-5 mb-2">
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Category Name</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} id="image" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Category Image</label>
                        </div>
                        {image && (
                            <div className="text-center">
                                <img src={URL.createObjectURL(image)} alt='category' height={'200px'} />
                            </div>
                        )}

                        <Link className='btn btn-dark mt-5' onClick={submitHandler}>Add Category</Link>
                    </form>
                </Card>
            </Container>
        </div>
    )
}
