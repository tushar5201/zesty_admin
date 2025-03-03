import React, { useReducer, useEffect, useState } from 'react';
import Header from './Header';
import TotalOrdersCard from './TotalOrdersCard';
import { Col, Row } from 'react-bootstrap';
import OrdersChart from './OrdersChart';
import PastOrdersandPartners from './PastOrders&partner';
import axios from 'axios';

const reducerOrders = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const reducerUsers = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, users: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const reducerRestaurant = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, restaurant: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default function Content() {
    const [{ loadingOrders, errorOrders, orders }, dispatchOrders] = useReducer(reducerOrders, {
        loading: true,
        error: '',
        orders: [],
    });

    const [{ loadingUsers, errorUsers, users }, dispatchUsers] = useReducer(reducerUsers, {
        loading: true,
        error: '',
        users: [],
    });

    const [{ loadingRestaurant, errorRestaurant, restaurant }, dispatchRestaurants] = useReducer(reducerRestaurant, {
        loading: true,
        error: '',
        restaurant: [],
    });

    const [revenue, setRevenue] = useState(0); // State to store the calculated revenue

    const fetchOrders = async () => {
        dispatchOrders({ type: 'FETCH_REQUEST' });
        try {
            const orders = await axios.get('https://zesty-backend.onrender.com/order/get-all-orders');
            calculateRevenue(orders.data); // Calculate revenue after fetching orders
            dispatchOrders({ type: 'FETCH_SUCCESS', payload: orders.data });
        } catch (error) {
            dispatchOrders({ type: 'FETCH_FAIL', payload: error.message });
        }
    };

    const fetchUsers = async () => {
        dispatchUsers({ type: 'FETCH_REQUEST' });
        try {
            const users = await axios.get('https://zesty-backend.onrender.com/user/get-all-users');
            dispatchUsers({ type: 'FETCH_SUCCESS', payload: users.data });
        } catch (error) {
            dispatchUsers({ type: 'FETCH_FAIL', payload: error.message });
        }
    };

    const fetchRestaurants = async () => {
        dispatchRestaurants({ type: 'FETCH_REQUEST' });
        try {
            const restaurants = await axios.get('https://zesty-backend.onrender.com/restaurant/get-all-restaurants');
            dispatchRestaurants({ type: 'FETCH_SUCCESS', payload: restaurants.data });
        } catch (error) {
            dispatchRestaurants({ type: 'FETCH_FAIL', payload: error.message });
        }
    };

    const calculateRevenue = (orders) => {
        let totalAmountUsers = 0;
        let totalAmountRestaurants = 0;

        orders.forEach((order) => {
            totalAmountUsers += parseInt(order.totalAmountUser) || 0;
            totalAmountRestaurants += parseInt(order.totalAmountRestaurant) || 0;
        });

        const totalRevenue = totalAmountUsers - totalAmountRestaurants;
        setRevenue(totalRevenue); // Update the revenue state
    };

    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchRestaurants();
    }, []);

    return (
        <div style={{ width: '100%', padding: '0', margin: '0' }}>
            <Header />
            <h2 style={{ margin: '15px 0 5px 20px' }}>Dashboard</h2>
            <p style={{ marginLeft: '20px', color: '#676a6c' }}>Welcome to Dashboard</p>
            <Row style={{ marginTop: '20px', marginLeft: '10px', marginRight: '5px' }}>
                <Col>
                    <TotalOrdersCard type="Revenue" total={revenue} image={'./images/revenue.png'} />
                </Col>
                {loadingOrders ? (
                    <h3>Loading...</h3>
                ) : errorOrders ? (
                    errorOrders
                ) : (
                    <Col>
                        <TotalOrdersCard type="Orders" total={orders.length} image={'./images/orders.png'} />
                    </Col>
                )}
                {loadingUsers ? (
                    <h3>Loading...</h3>
                ) : errorUsers ? (
                    errorUsers
                ) : (
                    <Col>
                        <TotalOrdersCard type="Users" total={users.length} image={'./images/users.png'} />
                    </Col>
                )}
                {loadingRestaurant ? (
                    <h3>Loading...</h3>
                ) : errorRestaurant ? (
                    errorRestaurant
                ) : (
                    <Col>
                        <TotalOrdersCard type="Restaurants" total={restaurant.length} image={'./images/restaurants.png'} />
                    </Col>
                )}
            </Row>
            <OrdersChart />
            <PastOrdersandPartners />
        </div>
    );
}