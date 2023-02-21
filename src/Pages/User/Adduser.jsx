import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./adduser.css";
import { Link, useParams } from "react-router-dom";

export const Adduser = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    userrole: "",
  });

  //  clear function
  const clearUserDetails = () => {
    setUserDetails({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      userrole: "",
    });
  };
  

  const options = ["Admin", "User", "Agent"];
  const onOptionChangeHandler = (event) => {
    console.log("User Selected Value - ", event.target.value);
  };


  const handleSave = async () => {};






  return (
    <div className="container1">
      <Link to="/">
        <h6 className="link01">Home </h6>{" "}
      </Link>
      <Link to="/users">
        <h6 className="link02">/ User </h6>{" "}
      </Link>
      <h6 className="link03">/ Add User</h6>
      <h4>Add User</h4>

      <div className="grid-container">
        <label>User Name</label>
        <input
          type="text"
          value={userDetails.name}
          placeholder="Enter User Number"
        />
        <label>password</label>
        <input
          type="text"
          value={userDetails.password}
          placeholder="Enter Your Password"
        />
        <label>User Role</label>
        <select onChange={onOptionChangeHandler}>
          <option></option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>

      <div className="grid-container-two">
        <label>User E-mail</label>
        <input
          type="email"
          value={userDetails.email}
          placeholder="Enter User E-mail"
        />
        <label>Confirm password</label>
        <input
          type="text"
          value={userDetails.password}
          placeholder="Enter Your Password"
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
  );
};
