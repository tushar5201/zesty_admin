import React from 'react';
import { Button, Card, CardHeader, CardTitle, Col, Container, Row } from "react-bootstrap"
import { Link } from 'react-router-dom';

export default function SigninScreen() {
    return (
        <div>
            <header>
                <Container>
                    <h1 className='logo'><b> Zesty</b></h1><br />
                </Container>
            </header>
            <section id="login-form">
                <Card className='mx-auto'>
                    <h2 className='card-title'>Hi, Welcome Back</h2>
                    <p>Enter credentials to continue</p>

                    <form action="">
                        <div className="form-floating m-3">
                            <input type="email" name="email" id="email" placeholder='name@gmail.com' className='form-control' />
                            <label for="email">Email address</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="password" name="password" id="password" placeholder='password' className='form-control' />
                            <label for="email">Password</label>
                        </div>

                        <Button className='btn-register m-3 me-3'>Sign In</Button>
                    </form><br />
                    <hr />
                    <Row>
                        <Col style={{marginLeft: "-25px"}} className='text-end' md={8}>
                            <p>Don't have an account ? </p>
                        </Col>
                        <Col className='text-start'>
                            <Link className='link'><b>Sign Up</b></Link>
                        </Col>
                    </Row>
                </Card>
            </section>
        </div>
    )
}
