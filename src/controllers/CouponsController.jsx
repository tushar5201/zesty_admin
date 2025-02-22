import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Card, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

export function CreateCoupon() {
    const [promoCode, setPromoCode] = useState("");
    const [description, setDescription] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [discountUpto, setDiscountUpto] = useState("");
    const [minAmountRequired, setMinAmountRequired] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsUpdate(true);
            const fetchCoupon = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(`https://zesty-backend.onrender.com/coupon/get-coupon/${id}`);
                    const coupon = res.data;
                    setPromoCode(coupon.promoCode);
                    setDescription(coupon.description);
                    setDiscountPercentage(coupon.discountPercentage);
                    setDiscountUpto(coupon.discountUpto);
                    setMinAmountRequired(coupon.minAmountRequired);
                    setLoading(false);
                } catch (error) {
                    toast.dark("Failed to fetch coupon details.");
                    setLoading(false);
                }
            };
            fetchCoupon();
        }
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const couponData = { promoCode, description, discountPercentage, discountUpto, minAmountRequired };

        try {
            let res;
            if (isUpdate) {
                res = await axios.put(`https://zesty-backend.onrender.com/coupon/update-coupon/${id}`, couponData);
                toast.dark("Coupon updated successfully.");
            } else {
                res = await axios.post("https://zesty-backend.onrender.com/coupon/add-coupon", couponData);
                toast.dark("Coupon added successfully.");
            }
            navigate("/admin/coupons");
        } catch (error) {
            toast.dark("Failed to save coupon.");
        }
    };

    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />

            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>{isUpdate ? "Update Coupon" : "Add Coupon"}</u></h3>

                    <form onSubmit={submitHandler}>
                        <div className="form-floating mt-3 mb-2">
                            <input
                                type="text"
                                name="promoCode"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                id="promoCode"
                                placeholder="Promo Code"
                                className="form-control"
                                style={{ width: "100%" }}
                                required
                            />
                            <label style={{ color: "#222" }}>Promo Code</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="description"
                                placeholder="Coupon Description"
                                className="form-control"
                                style={{ width: "100%" }}
                                required
                            />
                            <label style={{ color: "#222" }}>Coupon Description</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input
                                type="number"
                                name="discountPercentage"
                                value={discountPercentage}
                                onChange={(e) => setDiscountPercentage(e.target.value)}
                                id="discountPercentage"
                                placeholder="Discount Percentage"
                                className="form-control"
                                style={{ width: "100%" }}
                                required
                            />
                            <label style={{ color: "#222" }}>Discount Percentage</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input
                                type="number"
                                name="discountUpto"
                                value={discountUpto}
                                onChange={(e) => setDiscountUpto(e.target.value)}
                                id="discountUpto"
                                placeholder="Discount Upto"
                                className="form-control"
                                style={{ width: "100%" }}
                                required
                            />
                            <label style={{ color: "#222" }}>Discount Upto</label>
                        </div>

                        <div className="form-floating mt-3 mb-2">
                            <input
                                type="number"
                                name="minAmountRequired"
                                value={minAmountRequired}
                                onChange={(e) => setMinAmountRequired(e.target.value)}
                                id="minAmountRequired"
                                placeholder="Minimum Amount Required"
                                className="form-control"
                                style={{ width: "100%" }}
                                required
                            />
                            <label style={{ color: "#222" }}>Minimum Amount Required</label>
                        </div>

                        <button type="submit" className="btn btn-dark mt-5">{isUpdate ? "Update Coupon" : "Add Coupon"}</button>
                    </form>
                </Card>
            </Container>
        </div>
    );
}
