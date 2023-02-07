import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./editcustomer.css";
import { Link, useParams } from "react-router-dom";


export const Editcustomer = () => {

  const { phone } = useParams();

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [customerDetails, setCustomerDetails] = useState({
    phone:'',
    location:"",
    name:"",
    email:"",
    comment:"",
    address:"",
  });

  console.log(customerDetails,"this is cusdetails");

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerDetails = { name, email, location, comment, address, };

    fetch("/api/customers/" + phone, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerDetails),
      Authorization: "Bearer " + token,
    })
      .then(() => {
        alert("Saved successfully.");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

const fetchLocations = useCallback(async () => {
  // const queryParams = new URLSearchParams(phone); ${queryParams}
      const headers = new Headers({
           Authorization: "Bearer " + token,
      });
  try {
    let fetchData = await fetch("/api/customers/"  , { headers });
    fetchData = await fetchData.json();
    if (fetchData.error) {
      throw new Error(fetchData.error);
    } else {
      setCustomerDetails(fetchData.data);
    }
  } catch (error) {
    console.error(error);
  }
}, []);


useEffect(() => {
  fetchLocations();
}, []);

console.log(phone,'this is phone');
// console.log(customerDetails,"thiss is data")


  return (
    <div className="container1">
      <Link to="/">
        <h6 className="link01">Home </h6>{" "}
      </Link>
      <Link to="/customers">
        <h6 className="link02">/ Customer </h6>{" "}
      </Link>
      <h6 className="link03">/ Edit Customer</h6>
      <h4>Edit Customer</h4>

      <div className="grid-container">
        <label>Phone Number </label>
        <input
          type="text"
          name="name"
          onChange={e=>setCustomerDetails(e.target.value)}
          value={customerDetails}
          placeholder="Enter Customer Phone Number"
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setCustomerDetails(e.target.value)}
          value={customerDetails}
          placeholder="Enter Customer E-mail"
        />
        <label>Location</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setCustomerDetails(e.target.value)}
          value={customerDetails}
          placeholder="Enter Customer Location"
        />
      </div>

      <div className="grid-container-two">
        <label>Customer Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setCustomerDetails(e.target.value)}
          value={customerDetails}
          placeholder="Enter Customer Name"
        />
        <label>Customer Address</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setCustomerDetails(e.target.value)}
          value={customerDetails}
          placeholder="Enter Customer Address"
        />
        <label>Comment</label>
        <textarea
          name="name"
          rows={2}
          onChange={(e) => setCustomerDetails(e.target.value)}
          value={customerDetails}
          placeholder="Enter Customer Commnet"
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save" >
          Save
        </Button>
        <Button className="cansel" onClick={fetchLocations}>Cansel</Button>
      </div>
    </div>
  );
};
