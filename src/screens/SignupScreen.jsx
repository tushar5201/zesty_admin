import React, { useState } from 'react'
import RegistrationHeader from '../components/RegistrationHeader'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { url } from '../const'

export default function SignupScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");

    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post(`/admin/signup`, {email, password, secretCode});
            const res = await fetch("/admin/signup", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({username, password, secretCode})
            });
            if(res.status === 405) {
                toast.dark("Invalid Secret Code");
            } else if(res.status === 403) {
                toast.dark("User Already Registered");
            } else if(res.status === 200) {
                toast.dark("Successfully Signed Up");
                navigate("/admin/signin");
            }   
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <RegistrationHeader />
            <section id="signup-form">
                <Card className='mx-auto'>
                    <h2 className='card-title'>Hi, Welcome</h2>
                    <p>Enter credentials to continue</p>

                    <form action="">
                        <div className="form-floating m-3">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder='name@gmail.com' className='form-control' />
                            <label for="username">Username</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='password' className='form-control' />
                            <label for="password">Password</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="password" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} name="secretCode" id="secretCode" placeholder='Secret Code' className='form-control' />
                            <label for="secretCode">Secret Code</label>
                        </div>

                        <Button className='btn-register m-3 me-3' onClick={submitHandler}>Sign In</Button>
                    </form><br />
                    <hr />
                    <Row>
                        <Col style={{ marginLeft: "-25px" }} className='text-end' md={8}>
                            <p>Already have an account ? </p>
                        </Col>
                        <Col className='text-start'>
                            <Link className='link' to={"/admin/signin"}><b>Sign In</b></Link>
                        </Col>
                    </Row>
                </Card><br />
            </section>
        </div>
    )
}
