import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function PastOrdersandPartners() {
    return (
        <Row>
            <Col md={8}>
                <Card className='graph-card' style={{ margin: "20px 10px 0 20px", padding: "15px", }}>
                    <h5>Last Orders</h5>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Restaurant</th>
                                <th scope="col">Rider</th>
                                <th scope="col">Status</th>
                                <th scope="col">Location</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>Mr.Cafe</td>
                                <td>Vidhanshu</td>
                                <td><span style={{ backgroundColor: "#c6f5ea", color: "#024b3b", padding: "5px", borderRadius: "5px", fontSize: "15px" }}>Delivered</span></td>
                                <td>Surat</td>
                                <td>500</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </Col>
            <Col md={4}>
                <Card className='graph-card' style={{ marginLeft: "-10px", marginRight: "15px" }}>
                    <h5>Top Partner</h5>
                    <Row className='mt-3'>
                        <Col md={3}>
                            <img src="./images/zesty.jpeg" style={{ width: "75px", borderRadius: "100%" }} alt="" />
                        </Col>
                        <Col className='mt-2' style={{marginRight: "20px"}}>
                            <h6><strong>Domino's Pizza</strong></h6>
                            <p className='mt-0' style={{ fontSize: "14px", color: "#676a6c" }}>Restaurant</p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}
