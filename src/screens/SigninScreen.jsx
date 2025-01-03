import {React, useState} from 'react';
import { Button, Card, Col, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import RegistrationHeader from '../components/RegistrationHeader';
import {toast} from "react-toastify"
import "../assets/css/registration.css"


export default function SigninScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post(`/admin/signup`, {email, password, secretCode});
            const res = await fetch("/admin/signin", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({username, password})
            });
            if(res.status === 405) {
                toast.dark("Wrong Credentials");
            }else if(res.status === 401){
                toast.dark("User is not authenticared");
            } else if(res.status === 406) {
                toast.dark("Error in Signin");
            } else if(res.status === 200) {
                toast.dark("Successfully Signed In");
                navigate("/");
            }   
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <RegistrationHeader />
            <section id="login-form">
                <Card className='mx-auto'>
                    <h2 className='card-title'>Hi, Welcome Back</h2>
                    <p>Enter credentials to continue</p>

                    <form action="">
                        <div className="form-floating m-3">
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder='Username' className='form-control' />
                            <label for="Username">Username</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder='password' className='form-control' />
                            <label for="email">Password</label>
                        </div>

                        <Button className='btn-register m-3 me-3' onClick={submitHandler}>Sign In</Button>
                    </form><br />
                    <hr />
                    <Row>
                        <Col style={{marginLeft: "-25px"}} className='text-end' md={8}>
                            <p>Don't have an account ? </p>
                        </Col>
                        <Col className='text-start'>
                            <Link className='link' to={"/admin/signup"}><b>Sign Up</b></Link>
                        </Col>
                    </Row>
                </Card><br />
            </section>
        </div>
    )
}
