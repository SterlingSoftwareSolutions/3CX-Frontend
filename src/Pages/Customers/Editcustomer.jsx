import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./editcustomer.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Editcustomer = () => {
  const navigate = useNavigate();
  const { id, phone } = useParams();
  const token = localStorage.getItem("token");
  const [customerAddress, setCustomerAddress] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    phone: "",
    location: "",
    name: "",
    email: "",
    comment: "",
    address: "",
  });

  //  clear function
  const clearCustomerDetails = () => {
    setCustomerDetails({
      phone: "",
      location: "",
      name: "",
      email: "",
      comment: "",
      address: "",
    });
  };

  const fetchLocations = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("phone", phone);

    const headers = new Headers({
      Authorization: "Bearer " + token,
    });
    try {
      let fetchData = await fetch(`/api/customers/?${queryParams}`, {
        headers,
      });
      fetchData = await fetchData.json();
      if (fetchData) {
        console.log(fetchData);
        setCustomerDetails(fetchData);
        setCustomerAddress(fetchData.customer_address);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  // console.log(customerAddress);

  // const handlePhoneChange = (event) => {
  //   setCustomerDetails({ ...customerDetails, phone: event.target.value });
  // };

  const handleNameChange = (event) => {
    setCustomerDetails({ ...customerDetails, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setCustomerDetails({ ...customerDetails, email: event.target.value });
  };
  const handleAddressChange = (event) => {
    setCustomerDetails({ ...customerDetails, address: event.target.value });
  };

  const handleCommentChange = (event) => {
    setCustomerDetails({ ...customerDetails, comment: event.target.value });
  };

  const handleLocationChange = (event) => {
    setCustomerDetails({ ...customerDetails, location: event.target.value });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSave = async () => {
    try {
      const headers = new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      });

      const response = await fetch(`/api/customers/${phone}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(customerDetails),
      });
      console.log(phone);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Data saved successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        // window.location.reload();
        // clearCustomerDetails();
        navigate("/customers/");
      } else {
        throw new Error("Failed to save Customers");
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
    <div className="container0">
      <Link to="/">
        <h6 className="linkone">Home </h6>{" "}
      </Link>
      <Link to="/customers">
        <h6 className="linktwo">/ Customer </h6>{" "}
      </Link>
      <h6 className="linkthre">/ Edit Customer</h6>
      <h4>Edit Customer</h4>

      <div className="grid_containerleft">
        <label>Phone Number </label>
        <input
          type="text"
          value={customerDetails.phone}
          //onChange={handlePhoneChange}
          placeholder="Enter Customer Phone Number"
        />
        <label>E-mail</label>
        <input
          type="email"
          value={customerDetails.email}
          onChange={handleEmailChange}
          placeholder="Enter Customer E-mail"
        />
        <label>Location</label>
        <input
          type="text"
          onChange={handleLocationChange}
          value={customerDetails.location}
          placeholder="Enter Customer Location"
        />
      </div>

      <div className="grid_container1_right">
        <label>Customer Name</label>
        <input
          type="text"
          onChange={handleNameChange}
          value={customerDetails.name}
          placeholder="Enter Customer Name"
        />
        <label>Customer Address</label>
        <input
          type="text"
          onChange={handleAddressChange}
          value={
            customerAddress.length > 0 ? customerAddress[0].address_line_1 : ""
          }
          placeholder="Enter Customer Address"
        />
        <label>Comment</label>
        <textarea
          rows={2}
          onChange={handleCommentChange}
          value={customerDetails.comment}
          placeholder="Enter Customer Commnet"
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save" onClick={handleSave}>
          Save
        </Button>
        <Button className="cansel" onClick={clearCustomerDetails}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
