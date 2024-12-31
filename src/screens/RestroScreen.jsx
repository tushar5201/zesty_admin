import React, { useState } from 'react'
import RegistrationHeader from '../components/RegistrationHeader'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import axios from "axios";

export default function RestroScreen() {
    const [ownerName, setOwnerName] = useState("");
    const [password, setPassword] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [email, setEmail] = useState("");
    const [workingDays, setWorkingDays] = useState("");
    const [timings, setTimings] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [bankAC, setBankAC] = useState("");
    const [totalEarnings, setTotalEarnings] = useState("");
    // const [menu, setMenu] = useState([{
    //     image: null,
    //     name: null,
    //     price: null,
    //     description: null,
    //     category: null
    // }])

    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            const restroData = new FormData();
            restroData.append('ownerName', ownerName);
            restroData.append('password', password);
            restroData.append('restaurantName', restaurantName);
            restroData.append('email', email);
            restroData.append('workingDays', workingDays);
            restroData.append('timings', timings);
            restroData.append('phone', phone);
            restroData.append('location', location);
            restroData.append('bankAC', bankAC);
            restroData.append('totalEarnings', totalEarnings);
            // restroData.append('menu', menu1);
            menu.forEach((item, index) => {
                restroData.append(`menu[${index}][name]`, item.name);
                restroData.append(`menu[${index}][price]`, item.price);
                restroData.append(`menu[${index}][description]`, item.description);
                if (item.image) {
                    restroData.append(`menu[${index}][image]`, item.image); // File object
                }
            });
            console.log("FormData content:");
            for (let pair of restroData.entries()) {
                console.log(pair[0] + ":", pair[1]);
            }

            // const res = await fetch("/restaurant/signup", {
            //     method: 'POST',
            //     headers: { 'content-type': 'application/json' },
            //     body: JSON.stringify({ ownerName, password, restaurantName, email, workingDays, timings, phone, location, bankAC, totalEarnings, menu1 })
            // });
            const res = await axios.post("/restaurant/signup", restroData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (res.status === 405) {
                toast.dark("Restaurant Exist");
            } else if (res.status === 201) {
                toast.dark("Successfully Signed Up");
                navigate("/admin/signin");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const changeVal = [...menu];
        changeVal[i][name] = value;
        setMenu(changeVal);
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
                            <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} name="ownerName" id="ownerName" placeholder='name@gmail.com' className='form-control' />
                            <label for="ownerName">Owner Full Name</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='password' className='form-control' />
                            <label for="password">Password</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} name="restaurantName" id="restaurantName" placeholder='Secret Code' className='form-control' />
                            <label for="restaurantName">Restaurant Name</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="Email" id="Email" placeholder='Secret Code' className='form-control' />
                            <label for="Email">E mail</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={workingDays} onChange={(e) => setWorkingDays(e.target.value)} name="WorkingDays" id="WorkingDays" placeholder='Secret Code' className='form-control' />
                            <label for="WorkingDays">Working Days</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={timings} onChange={(e) => setTimings(e.target.value)} name="Timings" id="Timings" placeholder='Secret Code' className='form-control' />
                            <label for="Timings">Timings</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="Phone" id="Phone" placeholder='Secret Code' className='form-control' />
                            <label for="Phone">Phone</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} name="Location" id="Location" placeholder='Secret Code' className='form-control' />
                            <label for="Location">Location</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={bankAC} onChange={(e) => setBankAC(e.target.value)} name="BankAC" id="BankAC" placeholder='Secret Code' className='form-control' />
                            <label for="BankAC">Bank AC</label>
                        </div>
                        <div className="form-floating m-3">
                            <input type="text" value={totalEarnings} onChange={(e) => setTotalEarnings(e.target.value)} name="TotalEarnings" id="TotalEarnings" placeholder='Secret Code' className='form-control' />
                            <label for="TotalEarnings">Total Earnings</label>
                        </div>
                        {menu.map((val, i) => (
                            <div>
                                <input key={i} type="file" name="image" id="image" className="admin-input" placeholder="Item" value={val.image} onChange={(e) => handleChange(e, i)} /><br />
                                <input key={i} type="text" name="name" id="name" className="admin-input" placeholder="Item Name" value={val.name} onChange={(e) => handleChange(e, i)} /><br />
                                <input key={i} type="text" name="price" id="price" className="admin-input" placeholder="Item Price" value={val.price} onChange={(e) => handleChange(e, i)} /><br />
                                <input key={i} type="text" name="description" id="description" className="admin-input" placeholder="Item description" value={val.description} onChange={(e) => handleChange(e, i)} /><br />
                                <input key={i} type="text" name="category" id="category" className="admin-input" placeholder="Item category" value={val.category} onChange={(e) => handleChange(e, i)} /><br /><br />
                            </div>
                        ))}
                        <Button className="btn btn-primary" onClick={() => setMenu([...menu, { image: null, name: null, price: null, description: null, category: null }])}>
                            <i className="fa fa-plus"></i>
                        </Button>
                        <br /><br />
                        <Button className='btn-register m-3 me-3' onClick={submitHandler}>Register</Button>
                    </form>
                </Card><br />
            </section>
        </div>
    )
}
