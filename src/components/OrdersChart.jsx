import React from 'react';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import "../assets/css/totalOrdersCard.css";

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Card, Col, Row } from 'react-bootstrap';

export default function OrdersChart() {
    ChartJS.register(
        LineElement,
        PointElement,
        LineController,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Order Statistics (LE)',
                data: [500, 1200, 2150, 1800, 2000, 2500, 3000, 2200, 2700, 2900, 3100, 3200],
                borderColor: '#024b3b',
                backgroundColor: '#edf5f3',
                borderWidth: 2.5,
                pointBorderColor: '#024b3b',
                pointBackgroundColor: '#edf5f3',
                pointBorderWidth: 2.5,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#edf5f3',
                tension: 0.5, // Smooth curve
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#495057',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw} LE`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#6c757d',
                },
            },
            y: {
                grid: {
                    color: '#e9ecef',
                },
                ticks: {
                    color: '#6c757d',
                    callback: (value) => `${value} LE`,
                },
            },
        },
    };

    const doughnutData = {
        labels: ['Delivered', 'On Delivery', 'Cancelled'],
        datasets: [
            {
                data: [95, 20, 5],
                backgroundColor: ['#024b3b', '#88cfbf', '#c6f5ea'],
                borderWidth: 0
            },
        ],
    };
    return (
        <Row style={{ marginRight: "5px" }}>
            <Col md={8}>
                <Card className='graph-card' style={{}}>
                    <h5>Order Statistics</h5>
                    <Line data={lineChartData} options={options} />
                </Card>
            </Col>

            <Col md={4}>
                <Card className='graph-card' style={{ marginLeft: "0" }}>
                    <h5>Order Summary</h5><br />
                    <Doughnut data={doughnutData} />
                </Card>
            </Col>
        </Row>
    )
}
