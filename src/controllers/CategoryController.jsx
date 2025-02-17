import React, { useState } from 'react'
import Header from '../components/Header'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'

export default function CategoryController() {
    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />
            <Row>
                <Col md={10}>
                    <h2 style={{ margin: "15px 0 5px 20px" }}>Categories</h2>
                </Col>
                <Col>
                    <Link to={"/admin/add-category"} className='btn btn-outline-dark mt-4'>Add Category</Link>
                </Col>
            </Row>
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
            const res = await axios.post("https://zesty-backend-sepia.vercel.app/category/add-category", categoryData);
            if(res.status === 200) {
                toast.dark("Category Added");
                navigate("/admin/categories");
            } else if (res.status === 401) {
                toast.dark("Category already exist");
            } else if (res.status === 405){
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
