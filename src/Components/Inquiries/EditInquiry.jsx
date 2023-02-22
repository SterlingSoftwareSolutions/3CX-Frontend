import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./inquiryadd.css";
import { Link, useParams } from "react-router-dom";


const EditInquiry = () => {

    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [inquiryDetails, setInquiryDetails] = useState([
      {
        brand: "",
        brand_availability: "",
        product_category: "",
        status_remark: "",
        open: "",
      },
    ]);
  
    //  clear function
    const clearUserDetails = () => {
      setInquiryDetails({
        brand: "",
        brand_availability: "",
        product_category: "",
        status_remark: "",
        open: "",
      });
    };
  
    //options add
    const options = ["Open", "Close"];
    const onOptionChangeHandler = (event) => {
      console.log("User Selected Value - ", event.target.value);
    };
  
    //Save button
    const handleSave = async () => {};

  return (

    <div className="container1">
    <Link to="/">
      <h6 className="link01">Home </h6>{" "}
    </Link>
    <Link to="/inquiries">
      <h6 className="link02">/ Inquiry </h6>{" "}
    </Link>
    <h6 className="link03">/ Edit Inquiry</h6>
    <h4>Edit Inquiry</h4>

    {/* data start */}
    <div className="grid-container">
      <label>Brand</label>
      <input type="text" value={inquiryDetails.brand} placeholder="Brand" />

      <label>Product Catagory</label>
      <input
        type="text"
        value={inquiryDetails.product_category}
        placeholder="Product Catagory"
      />
      <label>Open/Close</label>
      <select onChange={onOptionChangeHandler}>
        <option></option>
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>

    <div className="grid-container-two">
      <label>Brand Availibility</label>
      <input
        type="text"
        value={inquiryDetails.brand_availability}
        placeholder="Brand Availibility"
      />
      <label>Status Remark</label>
      <input
        type="text"
        value={inquiryDetails.status_remark}
        placeholder="Status Remark"
      />
    </div>

    <div className="container-btn">
      <Button className="btn-save" onClick={handleSave}>
        Save
      </Button>
      <Button className="cansel" onClick={clearUserDetails}>
        Cancel
      </Button>
    </div>
  </div>

  )
}

export default EditInquiry