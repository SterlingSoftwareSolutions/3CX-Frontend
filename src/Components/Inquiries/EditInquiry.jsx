import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./inquiryadd.css";
import { Link, useParams } from "react-router-dom";

const EditInquiry = () => {
  const token = localStorage.getItem("token");
  const api = "/api/inquiries";
  const { id } = useParams();

  const [data, setData] = useState({
    brand: "",
    brand_availability: "",
    open: "",
    status_remark: "",
    product_category: "",
    user_id: "",
    customer_id: "",
    call_type_id: "",
  });

   //  clear function
   const clearCustomerDetails = () => {
    setData({
      brand: "",
    brand_availability: "",
    open: "",
    status_remark: "",
    product_category: "",
    user_id: "",
    customer_id: "",
    call_type_id: "",
    });
  };
  
  const fetchLocations = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("phone", id);

    const headers = new Headers({
      Authorization: "Bearer " + token,
    });
    try {
      let fetchData = await fetch(`/api/inquiries/?${queryParams}`, {
        headers,
      });
      fetchData = await fetchData.json();
      if (fetchData) {
        console.log(fetchData);
        setData(fetchData);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSave = async () => {
    // const headers = new Headers({
    //   "Content-Type": "application/json",
    //   Authorization: "Bearer " + token,
    // });
    // try {
    //   const response = await fetch(`/api/inquiries/${id}`, {
    //     method: "PUT",
    //     headers,
    //     body: JSON.stringify(customerDetails),
    //   });
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   // If the request was successful, redirect the user to the customer list page
    //   window.location.href = "/customers";
    // } catch (error) {
    //   console.error(error);
    // }
  };


  return (
    <div className="container1">
    <Link to="/">
      <h6 className="link01">Home </h6>{" "}
    </Link>
    <Link to="/inquiries">
      <h6 className="link02">/ Inquiry </h6>{" "}
    </Link>
    <h6 className="link03">/ Edi Inquiry</h6>
    <h4>Add Inquiry</h4>

    {/* data start */}
    <div className="grid-container">
      <label>User Id</label>
      <input type="text"
      value={data.user_id}
      //onChange={handlePhoneChange}
      placeholder="User Id" />

      <label>Brand</label>
      <input
        type="text"
        placeholder="Brand"
        value={data.brand}
       // onChange={handleEmailChange}
      />

      <label>Product Catagory</label>
      <input
        type="text"
        placeholder="Product Catagory"
        value={data.product_category}
        //onChange={handleEmailChange}
      />

      <label>Open/Close</label>
      <input
        type="text"
        placeholder=""
        value={data.open}
       // onChange={handleEmailChange}
      />
    </div>

    <div className="grid-container-two">
      <label>Customer Id</label>
      <input type="text" 
       value={data.customer_id}
       //onChange={handleEmailChange}
      placeholder="Customer Id" />

      <label>Call Type Id</label>
      <input type="text"  
       value={data.call_type_id}
       //onChange={handleEmailChange}
      placeholder="Call Type Id" />

      <label>Brand Availibility</label>
      <input
        type="text"
        placeholder="Brand"
        value={data.brand_availability}
       // onChange={handleEmailChange}
      />

      <label>Status Remark</label>

      <input
        type="text"
        placeholder="Status Remark"
        id="status_remark"
        value={data.status_remark}
        //onChange={handleEmailChange}
      />
    </div>

    <div className="container-btn">
      <Button className="btn-save" onClick={handleSave}>
        Save
      </Button>
      <Button className="cansel" onClick={clearCustomerDetails}>Cancel</Button>
    </div>
  </div>
);
};

export default EditInquiry;
