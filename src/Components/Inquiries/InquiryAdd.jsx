import React, { useState, useRef } from "react";
import { Button } from "antd";
import "./inquiryadd.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from "moment";

const InquiryAdd = () => {
  const token = localStorage.getItem("token");
  const api = "/api/inquiries";
  const followUpApi = "/api/follow_ups";  
  const [brand_availability_selet, set_select_brand_availability] = useState("");
  const [product_category, setproduct_category] = useState("");
  const [BrandOption, setBrandOption] = useState("");

  // const [producterror, setError] = useState("");
  // const [brandError, setBrandError] = useState("");
  // const [brandAvierror, setBrandAviError] = useState("");
  // const [followerror, setFollowError] = useState("");
  // const [statusError, setStatusError] = useState("");
  // const [dateError, setDateError] = useState("");

  const [data, setData] = useState({
    brand: "",
    brand_availability: "",
    open: "",
    status_remark: "",
    product_category: "",
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

  //  clear function
  //   const clearUserDetails = () => {
  //     setData({
  //       brand: "",
  //       brand_availability: "",
  //       product_category: "",
  //       status_remark: "",
  //       option: "",
  //     });
  //   };

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

  //post method
  // let handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!product_category) {
  //     setError("Field Required");
  //   } else {
  //     setError("");
  //   }
  //   if (!data.brand) {
  //     setBrandError("Field Required");
  //   } else {
  //     setBrandError("");
  //   }
  //   if (!brand_availability_selet) {
  //     setBrandAviError("Field Required");
  //   } else {
  //     setBrandAviError("");
  //   }
  //   if (product_category && data.brand && brand_availability_selet) {
  //     data.product_category = product_category;
  //     data.brand_availability = brand_availability_selet;
  //     const response = await apiRequest(api, data);
  //     const dataFollowup = {
  //       user_id: data.user_id,
  //       customer_id: data.customer_id,
  //       call_type_id: data.call_type_id,
  //       time: data.time,
  //     };
  //     await apiRequest(followUpApi, dataFollowup);
  //   }
  // };
  
  let apiRequest = async (url, apiData) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(apiData),
    };
    const response = await fetch(url, requestOptions).then((response) =>
      response.json()
    );
    console.log(response);
    return response;
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
        <label>Brand</label>
        {/* <p className="form-validation">{brandError}</p> */}
        <input
          type="text"
          //value={inquiryDetails.brand}
          onChange={(e) => onChangeValue("brand", e.target.value)}
          placeholder="Brand"
        />

        <label>Product Catagory</label>
        <select
          value={product_category}
          onChange={(e) => setproduct_category(e.target.value)}>
          {arr.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {/* <p className="form-validation">{producterror}</p> */}
        <label>Open/Close</label>

        <select
          onChange={(e) => setBrandOption(e.target.value)}
          value={BrandOption}>
          {followupStatus.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid-container-two">
        <label>Brand Availibility</label>
        {/* <p className="form-validation">{brandError}</p> */}
        <select
          onChange={(e) => set_select_brand_availability(e.target.value)}
          value={brand_availability_selet}>
          {brand_availability.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Status Remark</label>
        {/* <p className="form-validation">{statusError}</p> */}
        <input
          type="text"
          placeholder="Status Remark"
          onChange={(e) => onChangeValue("status_remark", e.target.value)}
          id="status_remark"
          value={data.status_remark}
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save">Save</Button>
        <Button
          className="cansel"
          onClick={(e) => {
           // handleSubmit(e);
          }}>
          {/* onClick={clearUserDetails} */}
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default InquiryAdd;
