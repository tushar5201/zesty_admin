import React, { useEffect, useReducer } from 'react'
import Header from '../components/Header'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function AddMartItem() {
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [grms, setGrms] = useState("");
    const [weight, setWeight] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setGrms(value);

        if (value >= 1000) {
            setWeight(`${(value / 1000).toFixed(2)} kg`);
        } else {
            setWeight(`${value} g`);
        }
    }

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files); // Convert FileList to Array
        setImages([...images, ...filesArray]); // Append new images properly
    };

    const submitHandler = async (e) => {
        const martItems = new FormData();
        martItems.append("name", name);
        // martItems.append("image", images);
        martItems.append("price", price);
        martItems.append("description", description);
        martItems.append("weight", weight);
        martItems.append("category", category);
        images.forEach((image, index) => {
            martItems.append("images", image)
        })

        try {
            const res = await axios.post("https://zesty-backend.onrender.com/zestyMart/add-mart-item", martItems, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            if (res.status === 200) {
                toast.dark("Mart Item Added");
                navigate("/admin/zesty-mart");
            } else if (res.status === 401) {
                toast.dark("Mart Item already exist");
            } else if (res.status === 405) {
                toast.dark("Mart item saving failed");
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
                    <h3><u>Add Mart Item</u></h3>

                    <form>

                        <select name="category" id="" onChange={(e) => setCategory(e.target.value)} className='in form-select mt-5'>
                            <option value="" disabled selected>Select category</option>
                            <option value="Fresh">Fresh</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Home">Home</option>
                            <option value="Kids">Kids</option>
                        </select>

                        <div className="form-floating mt-3 mb-2">
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Product name' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Product Name</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} id="price" placeholder='Product price' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Product Price</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder='Product description' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Product Description</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input type="number" name="grms" value={grms} onChange={handleChange} id="grms" placeholder='Product grms' className='in form-control' style={{ width: "100%" }} />
                            <label style={{ color: "#222" }}>Product Grams Per Pack</label>
                        </div>

                        <label htmlFor="" className='mt-3 text-start'>Product Images</label>
                        <input type="file" name="images" onChange={handleFileChange} id="" className='form-control' multiple required />
                        <p style={{ color: "#aaa" }}>*You can select multiple files</p>
                        <div className="d-flex" style={{ width: "450px" }}>
                            {images.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt='menu'
                                    width='150px'
                                    height='200px'
                                    className='p-1'
                                />
                            ))}
                        </div>

                        <Link className='btn btn-dark mt-5' onClick={submitHandler}>Add Mart Item</Link>
                    </form>
                </Card>
            </Container>
        </div>)
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, martItem: action.payload };
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export function UpdateZestyMart() {
    const [{ loading, error, martItem }, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
        martItem: {}
    })

    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [existingImgs, setExistingImgs] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const value = e.target.value;
        // setGrms(value);

        if (value >= 1000) {
            setWeight(`${(value / 1000).toFixed(2)} kg`);
        } else {
            setWeight(`${value} g`);
        }
    }

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files); // Convert FileList to Array
        setImages([...images, ...filesArray]); // Append new images properly
    };

    const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
            const res = await axios.get(`/zestyMart/get/${id}`);
            setExistingImgs(res.data.images);
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILED', payload: error.message })
        }
    }

    const handleImageDelete = (index) => {
        const updatedImages = existingImgs.filter((_, i) => i !== index);
        setExistingImgs(updatedImages);
    }

    const submitHandler = async () => {
        const martItemData = new FormData();
        martItemData.append("id", id);
        martItemData.append("name", name);
        martItemData.append("category", category);
        martItemData.append("price", price);
        martItemData.append("description", description);
        martItemData.append("weight", weight);

        // Append existing images
        martItemData.append("existingImages", JSON.stringify(existingImgs));

        // Append new images
        images.forEach((image) => {
            martItemData.append("images", image);
        });

        try {
            const res = await axios.post(
                "/zestyMart/update-mart-item",
                martItemData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                toast.dark("Mart item Updated");
                navigate("/admin/zesty-mart");
            } else if (res.status === 401) {
                toast.dark("Mart update failed");
            } else {
                toast.dark("Internal server error");
            }
        } catch (error) {
            console.log(error);
            toast.dark("Failed to update.");
        }
    };

    useEffect(() => {
        fetchData();
        // fetchImages();
    }, []);
    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />

            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>Update Category</u></h3>

                    {loading ? <h1>Loading...</h1> : error ? error :
                        <form>

                            <select name="category" defaultValue={martItem.category} id="" onChange={(e) => setCategory(e.target.value)} className='in form-select mt-5'>
                                <option value="" disabled selected>Select category</option>
                                <option value="Fresh">Fresh</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Home">Home</option>
                                <option value="Kids">Kids</option>
                            </select>

                            <div className="form-floating mt-3 mb-2">
                                <input type="text" name="name" defaultValue={martItem.name} onChange={(e) => setName(e.target.value)} id="name" placeholder='Product name' className='in form-control' style={{ width: "100%" }} />
                                <label style={{ color: "#222" }}>Product Name</label>
                            </div>

                            <div className="form-floating mt-3 mb-2">
                                <input type="number" name="price" defaultValue={martItem.price} onChange={(e) => setPrice(e.target.value)} id="price" placeholder='Product price' className='in form-control' style={{ width: "100%" }} />
                                <label style={{ color: "#222" }}>Product Price</label>
                            </div>

                            <div className="form-floating mt-3 mb-2">
                                <input type="text" name="description" defaultValue={martItem.description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder='Product description' className='in form-control' style={{ width: "100%" }} />
                                <label style={{ color: "#222" }}>Product Description</label>
                            </div>

                            <div className="form-floating mt-3 mb-2">
                                <input type="text" name="grms" defaultValue={martItem.weight} onChange={handleChange} id="grms" placeholder='Product grms' className='in form-control' style={{ width: "100%" }} />
                                <label style={{ color: "#222" }}>Product Grams Per Pack</label>
                            </div>

                            <label htmlFor="" className='mt-3 text-start'>Product Images</label>
                            <input type="file" name="images" onChange={handleFileChange} id="" className='form-control' multiple required />
                            <p style={{ color: "#aaa" }}>*You can select multiple files</p>
                            <div className="d-flex" style={{ width: "450px" }}>
                                {images.map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt='menu'
                                        width='150px'
                                        height='200px'
                                        className='p-1'
                                    />
                                ))}
                            </div>
                            <table className='table'>
                                <tbody>
                                    {existingImgs !== null && existingImgs.map((img, index) => (
                                        <tr>
                                            <td>
                                                <img src={img} alt={index} style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
                                            </td>
                                            <td><button className='btn btn-danger' onClick={() => handleImageDelete(index)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Link className='btn btn-dark mt-5' onClick={submitHandler}>Add Mart Item</Link>
                        </form>
                    }
                </Card>
            </Container>
        </div>
    )
}
