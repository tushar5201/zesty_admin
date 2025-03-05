import React, { useState, useEffect, useReducer } from 'react';
import Header from '../components/Header';
import { Card, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export function CreateCoupon() {
    const [promoCode, setPromoCode] = useState("");
    const [description, setDescription] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [discountUpto, setDiscountUpto] = useState("");
    const [minAmountRequired, setMinAmountRequired] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const couponData = { promoCode, description, discountPercentage, discountUpto, minAmtReq: minAmountRequired };

        try {
            let res;
            res = await axios.post("https://zesty-backend.onrender.com/coupon/add-coupon", couponData);
            toast.dark("Coupon added successfully.");
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
                    <h3><u>Add Coupon</u></h3>

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
                        {loading ? <Loading /> :
                            <button type="submit" className="btn btn-dark mt-5">Add Coupon</button>
                        }
                    </form>
                </Card>
            </Container>
        </div>
    );
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, coupon: action.payload };
        case "FETCH_FAILED":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function UpdateCoupon() {
    const [{ loading, error, coupon }, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
        coupon: {}
    });

    const [loading1, setLoading] = useState(false);

    const [promoCode, setPromoCode] = useState("");
    const [description, setDescription] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [discountUpto, setDiscountUpto] = useState("");
    const [minAmtReq, setMinAmtReq] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const couponData = new FormData();
        couponData.append("id", id);
        couponData.append("promoCode", promoCode);
        couponData.append("description", description);
        couponData.append("discountPercentage", discountPercentage);
        couponData.append("discountUpto", discountUpto);
        couponData.append("minAmtReq", minAmtReq);

        try {
            const res = await axios.post(`https://zesty-backend.onrender.com/coupon/update-coupon/${id}`, couponData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            // const res = await fetch(`/coupon/update-coupon/${id}`, {
            //     method: "POST",
            //     withCredentials: true,
            //     body: JSON.stringify({ minAmtReq, discountUpto, discountPercentage, description, promoCode })
            // });
            if (res.status === 200) {
                toast.dark("Coupon Updated");
                navigate("/admin/coupons");
            } else if (res.status === 401) {
                toast.dark("coupon update failed");
            } else {
                toast.dark("internal server error");
            }
        } catch (error) {
            console.log(error);
            toast.dark("failed to add.")
        }
    }

    const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
            const res = await axios.get(`https://zesty-backend.onrender.com/coupon/get/${id}`);
            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILED', payload: error.message })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div style={{ width: "100%", padding: "0", margin: "0" }}>
            <Header />

            <Container>
                <Card className='text-center mt-5 w-50 mx-auto p-5'>
                    <h3><u>Update Coupon</u></h3>

                    {loading ? <Loading /> : error ? <MessageBox>{error}</MessageBox> :

                        <form>
                            <div className="form-floating mt-3 mb-2">
                                <input
                                    type="text"
                                    name="promoCode"
                                    defaultValue={coupon.promoCode}
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
                                    defaultValue={coupon.description}
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
                                    defaultValue={coupon.discountPercentage}
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
                                    defaultValue={coupon.discountUpto}
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
                                    defaultValue={coupon.minAmtReq}
                                    onChange={(e) => setMinAmtReq(e.target.value)}
                                    id="minAmountRequired"
                                    placeholder="Minimum Amount Required"
                                    className="form-control"
                                    style={{ width: "100%" }}
                                    required
                                />
                                <label style={{ color: "#222" }}>Minimum Amount Required</label>
                            </div>

                            {loading1 ? <Loading /> :
                                <button type="submit" onClick={submitHandler} className="btn btn-dark mt-5">Update Coupon</button>
                            }
                        </form>
                    }
                </Card>
            </Container>
        </div>)
}
