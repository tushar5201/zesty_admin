import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { Modal } from 'react-bootstrap'
import { io } from "socket.io-client"
import { toast } from 'react-toastify'

const socket = io("https://zesty-backend-sepia.vercel.app");

export default function HomeScreen() {
  const [restaurant, setRestaurant] = useState({});
  const [show, setShow] = useState("");

  useEffect(() => {
    socket.emit("admin_join");
    socket.on("new_restaurant", (data) => {
      setRestaurant(data)
      console.log("New Restaurant Received");
      setShow("show");
    });

    return () => socket.off("new_restaurant");
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const res = await axios.put(`https://zesty-backend.onrender.com/restaurant/update-restaurant/${id}`, { verified: status });
      if (res.status === 200) {
        toast.dark("successfully verified");
      } else {
        toast.dark("error in verifying");
      }
      setRestaurant(restaurant.map(r => (r._id === id ? { ...r, verified: status } : r)));
    } catch (error) {
      console.log("err in updating " + error);
    }
  }

  return (
    <div className='app'>
      <Sidebar id={1} />
      <Content />
      <div className={`modal ${show}`} style={{ display: "block", position: "initial" }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{restaurant.restaurantName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Restaurant Logo : <br /><img className='ms-5' src={`https://zesty-backend.onrender.com/restaurant/get-restaurant-logo/${restaurant._id}`} alt={restaurant.restaurantName} width={150} /><br />
            <table className='table'>
              <tbody>
                <tr>
                  <td>Owner Name</td>
                  <td>{restaurant.ownerName}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{restaurant.shopNumber}{', '}{restaurant.floor}{', '}{restaurant.buildingName}{', '}{restaurant.selectedArea}{', '}{restaurant.city}{', '}{restaurant.state}{', '}{restaurant.pincode}{'.'}</td>
                </tr>
                <tr>
                  <td>Email Address</td>
                  <td>{restaurant.email}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>{restaurant.mobile}</td>
                </tr>
                <tr>
                  <td>PAN Number</td>
                  <td>{restaurant.pan}</td>
                </tr>
                <tr>
                  <td>GST Number</td>
                  <td>{restaurant.gstin}</td>
                </tr>

                <h5 className='mt-2'>Bank Details</h5>
                <tr>
                  <td>Account Number</td>
                  <td>{restaurant.acno}</td>
                </tr>
                <tr>
                  <td>IFSC Code</td>
                  <td>{restaurant.ifsc}</td>
                </tr>
                <tr>
                  <td>Food Type</td>
                  <td>{restaurant.veg}</td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td>{restaurant.payment}</td>
                </tr>
                <label htmlFor="">Menu Images : </label>
                {restaurant.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.data} // Adjust this URL as per your backend storage
                    alt="menu"
                    width="150"
                    height="200"
                    style={{ borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
                  />
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => handleApproval(restaurant._id, "approved")}>Approve</button>
            <button onClick={() => handleApproval(restaurant._id, "rejected")}>Reject</button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  )
}
