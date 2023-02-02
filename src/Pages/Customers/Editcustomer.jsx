import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "./editcustomer.css";
import { Link } from "react-router-dom";

export const Editcustomer = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    comment: "",
  });

  const [customer_address, setCustomerData] = useState({
    address_line_1: "",
    address_line_2: "",
  });

  useEffect(() => {
    console.log();
  }, []);

  const onChangeValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeAddressValue = (key, value) => {
    setCustomerData((prev) => ({ ...prev, [key]: value }));
  };
  console.log(data, "HHHHHHHHHHHHHHHHHHHHHHH");

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
          onChange={(e) => onChangeValue("phone", e.target.value)}
          value={data.phone}
          placeholder="Enter Customer Phone Number"
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          onChange={(e) => onChangeValue("email", e.target.value)}
          value={data.email}
          placeholder="Enter Customer E-mail"
        />
        <label>Location</label>
        <input
          type="text"
          name="name"
          onChange={(e) => onChangeValue("location", e.target.value)}
          value={data.location}
          placeholder="Enter Customer Location"
        />
      </div>

      <div className="grid-container-two">
        <label>Customer Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => onChangeValue("name", e.target.value)}
          value={data.name}
          placeholder="Enter Customer Name"
        />
        <label>Customer Address</label>
        <input
          type="text"
          name="name"
          onChange={(e) =>
            onChangeAddressValue("address_line_1", e.target.value)
          }
          value={customer_address.address_line_1}
          placeholder="Enter Customer Address"
        />
        <label>Comment</label>
        <textarea
          name="name"
          rows={2}
          onChange={(e) => onChangeValue("comment", e.target.value)}
          value={data.comment}
          placeholder="Enter Customer Commnet"
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save"> Save </Button>
        <Button className="cansel">Cansel</Button>
      </div>
    </div>
  );
};
