import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./adduser.css";
import { Link, useParams } from "react-router-dom";

export const Edituser = () => {
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

  const fetchLocations = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("phone", id);

    const headers = new Headers({
      Authorization: "Bearer " + token,
    });
    try {
      let fetchData = await fetch(`/api/users/?${queryParams}`, {
        headers,
      });
      fetchData = await fetchData.json();
      if (fetchData) {
        console.log(fetchData);
        setUserDetails(fetchData);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  // console.log(customerAddress);

  const handleNameChange = (event) => {
    setUserDetails({ ...userDetails, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUserDetails({ ...userDetails, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUserDetails({ ...userDetails, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setUserDetails({ ...userDetails, confirm_password: event.target.value });
  };

  const handleUserRoleChange = (event) => {
    setUserDetails({ ...userDetails, userrole: event.target.value });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSave = async () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // If the request was successful, redirect the user to the customer list page
      window.location.href = "/customers";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container1">
      <Link to="/">
        <h6 className="link01">Home </h6>{" "}
      </Link>
      <Link to="/users">
        <h6 className="link02">/ User </h6>{" "}
      </Link>
      <h6 className="link03">/ Edit User</h6>
      <h4>Edit User</h4>

      <div className="grid-container">
        <label>User Name</label>
        <input
          type="text"
          value={userDetails.name}
          onChange={handleNameChange}
          placeholder="Enter User Number"
        />
        <label>password</label>
        <input
          type="text"
          onChange={handlePasswordChange}
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
          onChange={handleEmailChange}
          value={userDetails.email}
          placeholder="Enter User E-mail"
        />
        <label>Confirm password</label>
        <input
          type="text"
          onChange={ handleConfirmPasswordChange}
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
