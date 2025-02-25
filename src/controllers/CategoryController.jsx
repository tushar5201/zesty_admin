import React, { useEffect, useReducer, useState } from 'react'
import Header from '../components/Header'
import { Card, Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'

export function CreateCategory() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {

        const categoryData = new FormData();
        categoryData.append("name", name);
        categoryData.append("image", image);
        try {
            const res = await axios.post("https://zesty-backend.onrender.com/category/add-category", categoryData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: 'include' });
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

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, category: action.payload };
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function UpdateCategory() {

    const [{ loading, error, category }, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
        category: {}
    })

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const submitHandler = async () => {

        const categoryData = new FormData();
        categoryData.append("id", id);
        categoryData.append("name", name);
        categoryData.append("image", image);
        try {
            const res = await axios.put(
                "https://zesty-backend.onrender.com/category/update-category",
                categoryData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true  // Ensure credentials are included
                }
            );
            console.log(res.headers);

            if (res.status === 200) {
                toast.dark("Category Updated");
                navigate("/admin/categories");
            } else if (res.status === 401) {
                toast.dark("category update failed");
            } else {
                toast.dark("internal server error");
            }
        } catch (error) {
            console.log(error);
            toast.dark("failed to add.")
        }
    }

    const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
            const res = await axios.get(`https://zesty-backend.onrender.com/category/get/${id}`);
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILED', payload: error.message })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />

            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>Add Category</u></h3>

                    {loading ? <h1>Loading...</h1> : error ? error :
                        <form>
                            <div className="form-floating mt-5 mb-2">
                                <input type="text" name="name" defaultValue={category.name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                <label style={{ color: "#222" }}>Category Name</label>
                            </div>

                            <div className="form-floating mt-3 mb-2">
                                <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} id="image" placeholder='Category name' className='in form-control' style={{ width: "100%" }} />
                                <label style={{ color: "#222" }}>Category Image</label>
                            </div>
                            <img src={`https://zesty-backend.onrender.com/category/get-category-image/${category._id}`} height={"200px"} alt={category.name} /> <br />
                            {image && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(image)} alt='category' height={'200px'} />
                                </div>
                            )}
                            <Link className='btn btn-dark mt-5' onClick={submitHandler}>Update Category</Link>
                        </form>
                    }
                </Card>
            </Container>
        </div>
    )
}
