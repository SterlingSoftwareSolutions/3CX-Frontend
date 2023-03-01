import React, { useState, useRef,useEffect } from "react";
import { Button } from "antd";
import "./inquiryadd.css";
import { Link } from "react-router-dom";

const InquiryAdd = () => {
  const token = localStorage.getItem("token");
  const api = "/api/inquiries";
  // const call_type_id = localStorage.getItem("call_type_id");
  // const user_id = localStorage.getItem("user_id");
  // const customer_id = localStorage.getItem("customer_id");
  
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    customer_id: "",
    call_type_id: "",
  });
  
 

  const [data, setData] = useState({
    brand: "",
    brand_availability: "",
    open: "",
    status_remark: "",
    product_category: "",
    user_id: userInfo.user_id,
    customer_id: "",
    call_type_id: "",
  });

 

  const [arr, setArr] = useState([
    { name: " " },
    { name: "TV" },
    { name: "Mobile Phone" },
    { name: "Air Conditioners" },
    { name: "Apple Products" },
    { name: "Audio" },
    { name: "Computers" },
    { name: "Refrigerator " },
    { name: "Washing Machine" },
    { name: "Home Appliances" },
    { name: "Kitchen Appliances" },
    { name: "Built-In Appliances & Ovens" },
    { name: "Small Appliances" },
    { name: "Watch" },
    { name: "Generators" },
    { name: "The Face Shop" },
    { name: "Skechers" },
    { name: "Under Armour" },
    { name: "Hyundai" },
    { name: "Bathware" },
    { name: "Sanitary Ware" },
    { name: "Medical Devices" },
    { name: "Cooking Appliances" },
    { name: "Clothing" },
    { name: "Home Needs" },
    { name: "Health & Beauty" },
    { name: "Baby & Kids" },
    { name: "Sports & Fitness" },
    { name: "Daily Essentials" },
    { name: "Special Offer" },
    { name: "Other" },
  ]);

  const onChangeValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // const onChangeIDValue = (key, value) =>{
  //   setUserInfo((prev) => ({...prev,[key]: value}))
  // };

  const [followupStatus] = useState([
    { id: "", name: " " },
    { id: 1, name: "Follow Up" },
    { id: 0, name: "Close" },
  ]);

  const [brand_availability] = useState([
    { name: " " },
    { name: "Yes" },
    { name: "No" },
  ]);

  useEffect(() => {
    const user_id = generateId();
    const customer_id = generateId();
    const call_type_id = generateId();

    // localStorage.setItem("user_id", user_id);
    localStorage.setItem("customer_id", customer_id);
    localStorage.setItem("call_type_id", call_type_id);

    setUserInfo((prev) => ({...prev, user_id, customer_id, call_type_id}))
  }, []);

  const generateId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
  const onChangeIDValue = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_id = localStorage.getItem("user_id");
      const customer_id = localStorage.getItem("customer_id");
      const call_type_id = localStorage.getItem("call_type_id");
  
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        // handle success
        setData({
          brand: "",
          brand_availability: "",
          open: "",
          status_remark: "",
          product_category: "",
        });
      } else {
        // handle error
        console.log("Failed to add inquiry");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <div className="container1">
      <Link to="/">
        <h6 className="link01">Home </h6>{" "}
      </Link>
      <Link to="/inquiries">
        <h6 className="link02">/ Inquiry </h6>{" "}
      </Link>
      <h6 className="link03">/ Add Inquiry</h6>
      <h4>Add Inquiry</h4>

      {/* data start */}
      <div className="grid-container">
        <label>User Id</label>
        <input type="text"
        value={userInfo.user_id} 
        onChange={(e) =>onChangeIDValue("user_id", e.target.value)}
        placeholder="User Id" />

        <label>Brand</label>
        <input
          type="text"
          value={data.brand}
          onChange={(e) => onChangeValue("brand", e.target.value)}
          placeholder="Brand"
        />

        <label>Product Catagory</label>
        <select
          value={data.product_category}
          onChange={(e) => onChangeValue("product_category", e.target.value)}>
          {arr.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Open/Close</label>

        <select
          value={data.open}
          onChange={(e) => onChangeValue("open", e.target.value)}>
          {followupStatus.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-container-two">
        <label>Customer Id</label>
        <input type="text" value={userInfo.customer_id} 
         onChange={(e) =>onChangeIDValue("customer_id", e.target.value)}
        placeholder="Customer Id" />

        <label>Call Type Id</label>
        <input type="text" value={userInfo.call_type_id}  
        onChange={(e) =>onChangeIDValue("call_type_id", e.target.value)}
        placeholder="Call Type Id" />

        <label>Brand Availibility</label>
        <select
          value={data.brand_availability}
          onChange={(e) => onChangeValue("brand_availability", e.target.value)}>
          {brand_availability.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Status Remark</label>

        <input
          type="text"
          placeholder="Status Remark"
          onChange={(e) => onChangeValue("status_remark", e.target.value)}
          id="status_remark"
          value={data.status_remark}
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save" onClick={handleSubmit}>
          Save
        </Button>
        <Link to ="/inquiries">
        <Button className="cansel">Cancel</Button></Link>
      </div>
    </div>
  );
};

export default InquiryAdd;
