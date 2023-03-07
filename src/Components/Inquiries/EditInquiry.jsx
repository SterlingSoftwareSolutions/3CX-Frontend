import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./inquiryadd.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { forEach } from "lodash";

const EditInquiry = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState({ customer: "" });
  const [callType, setCallType] = useState({
    call_type_name: "",
  });
  const [userName, setUserName] = useState({
    user_name: "",
  });
  const [data, setData] = useState({
    brand: "",
    brand_availability: "",
    open: "",
    status_remark: "",
    product_category: "",
  });

  //  clear function
  const clearCustomerDetails = () => {
    setData({
      brand: "",
      brand_availability: "",
      open: "",
      status_remark: "",
      product_category: "",
      user_name: "",
      customer_name: "",
      call_type_name: "",
    });
  };

  const fetchLocations = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("inquiry", id);

    var url = window.location.href;
    var customer_id = url.substring(url.lastIndexOf("/") + 1);

    const headers = new Headers({
      Authorization: "Bearer " + token,
    });

    try {
      let fetchData = await fetch(`/api/inquiries/${customer_id}`, {
        headers,
      });
      fetchData = await fetchData.json();

      if (fetchData && fetchData.data) {
        // update the state with the correct data
        setData(fetchData.data[0]);
        setCustomerName(fetchData.data[0].customer);
        setCallType(fetchData.data[0].call_type);
        setUserName(fetchData.data[0].user);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleusernameChange = (event) => {
    setUserName({ ...data, name: event.target.value });
  };

  const handleBrandChange = (event) => {
    setData({ ...data, brand: event.target.value });
  };

  const handleProductChange = (event) => {
    setData({ ...data, product_category: event.target.value });
  };

  const handleOpenChange = (event) => {
    setData({ ...data, open: event.target.value });
  };

  const handleCustomernameChange = (event) => {
    setCustomerName({ ...data, name: event.target.value });
  };

  const handleCalltypeChange = (event) => {
    setCallType({ ...data, name: event.target.value });
  };

  const handleBrandAvaChange = (event) => {
    setData({ ...data, brand_availability: event.target.value });
  };

  const handleStatusChange = (event) => {
    setData({ ...data, status_remark: event.target.value });
  };

  const handleSave = async () => {
    try {
      const headers = new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      });

      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Data saved successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        // window.location.reload();
        // clearCustomerDetails();
        navigate("/inquiries/");
      } else {
        throw new Error("Failed to save inquiry");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
      console.error(error);
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
      <h6 className="link03">/ Edit Inquiry</h6>
      <h4>Edit Inquiry</h4>

      {/* data start */}
      <div className="grid-container">
        <label>User Name</label>
        <input
          type="text"
          value={userName.name}
          onChange={handleusernameChange}
          placeholder="User Name"
        />

        <label>Brand</label>
        <input
          type="text"
          placeholder="Brand"
          value={data.brand}
          onChange={handleBrandChange}
        />

        <label>Product Catagory</label>
        <input
          type="text"
          placeholder="Product Catagory"
          value={data.product_category}
          onChange={handleProductChange}
        />

        <label>Open/Close</label>
        {/* <input
          type="text"
          placeholder=""
          value={data.open}
          onChange={handleOpenChange}
        /> */}
        {data.open === 1 ? (
          <div>
            <label htmlFor="status"></label>
            <input
              type="text"
              id="status"
              name="status"
              value="Open"
              disabled
              onChange={handleOpenChange}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="status"></label>
            <input
              type="text"
              id="status"
              name="status"
              value="Closed"
              disabled
            />
          </div>
        )}
      </div>

      <div className="grid-container-two">
        <label>Customer Name</label>
        <input
          type="text"
          onChange={handleCustomernameChange}
          value={customerName.name}
          placeholder="Customer Name"
        />

        <label>Call Type Name</label>
        <input
          type="text"
          value={callType.name}
          onChange={handleCalltypeChange}
          placeholder="Call Type Name"
        />

        <label>Brand Availibility</label>
        <input
          type="text"
          placeholder="Brand"
          value={data.brand_availability}
          onChange={handleBrandAvaChange}
        />

        <label>Status Remark</label>

        <input
          type="text"
          placeholder="Status Remark"
          id="status_remark"
          value={data.status_remark}
          onChange={handleStatusChange}
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save" onClick={handleSave}>
          Save
        </Button>
        <Link to="/inquiries">
          <Button className="cansel" onClick={clearCustomerDetails}>
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditInquiry;
