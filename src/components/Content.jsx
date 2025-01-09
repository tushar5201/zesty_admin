import React from 'react'
import Header from './Header'
import TotalOrdersCard from './TotalOrdersCard'
import { Card, Col, Row } from 'react-bootstrap'
import OrdersChart from './OrdersChart'
import PastOrdersandPartners from './PastOrders&partner'

export default function Content() {
    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />
            <h2 style={{ margin: "15px 0 5px 20px" }}>Dashboard</h2>
            <p style={{ marginLeft: "20px", color: "#676a6c" }}>Welcome to Dashboard</p>
            <Row style={{ marginTop: "20px", marginLeft: "10px", marginRight: "5px" }}>
                <Col>
                    <TotalOrdersCard type="Revenue" total={120000} image={"./images/revenue.png"} />
                </Col>
                <Col>
                    <TotalOrdersCard type="Orders" total={576} image={"./images/orders.png"} />
                </Col>
                <Col>
                    <TotalOrdersCard type="Users" total={152} image={"./images/users.png"} />
                </Col>
                <Col>
                    <TotalOrdersCard type="Riders" total={175} image={"./images/riders.png"} />
                </Col>
                <Col>
                    <TotalOrdersCard type="Partners" total={52} image={"./images/restaurants.png"} />
                </Col>
            </Row>
            <OrdersChart />
            <PastOrdersandPartners />
        </div>
    )
}
