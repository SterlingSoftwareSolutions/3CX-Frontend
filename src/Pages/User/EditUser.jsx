import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./edituser.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Edituser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  //  clear function
  const clearCustomerDetails = () => {
    setUserData({
      name: "",
      email: "",
      role: "",
    });
  };

  const fetchLocationsUsers = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("inquiry", id);

    var url = window.location.href;
    var id = url.substring(url.lastIndexOf("/") + 1);
    console.log(id);
    const headers = new Headers({
      Authorization: "Bearer " + token,
    });

    try {
      let fetchData = await fetch(`/api/users/${id}`, {
        headers,
      });
      fetchData = await fetchData.json();

      if (fetchData && fetchData.data) {
        // update the state with the correct data
        setUserData({
          name: fetchData.data.name,
          email: fetchData.data.email,
          role: fetchData.data.role,
        });
        console.log(fetchData);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(userData);

  useEffect(() => {
    fetchLocationsUsers();
  }, [fetchLocationsUsers]);

  const handleNameChange = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  const handleRoleChange = (event) => {
    setUserData({ ...userData, role: event.target.value });
  };

  const handleSave = async () => {
    try {
      const headers = new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      });
      console.log(userData);
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Data saved successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/users/");
      } else {
        const errorResponse = await response.json();
        if (
          errorResponse.message &&
          errorResponse.message.email
          // && errorResponse.message.email[0] === "The email has already been taken."
        ) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "The email address you entered already exists in the database. Please try again with a different email address.",
          });
        } else {
          throw new Error("Failed to save users");
        }
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
    <div className="contain">
      <Link to="/">
        <h6 className="link01">Home </h6>{" "}
      </Link>
      <Link to="/users">
        <h6 className="link02">/ User </h6>{" "}
      </Link>
      <h6 className="link03">/ Edit User</h6>
      <h4>Edit User</h4>
      <form>
        <div className="grid-container">
          <label>User Name *</label>
          <input
            type="text"
            value={userData.name}
            onChange={handleNameChange}
            placeholder="Enter User Number"
          />

          <label>User Role *</label>
          <input
            type="text"
            placeholder="Enter User Number"
            onChange={handleRoleChange}
            value={userData.role}
          />
        </div>

        <div className="grid-containertwo">
          <label>User E-mail *</label>
          <input
            type="email"
            value={userData.email}
            onChange={handleEmailChange}
            placeholder="Enter User E-mail"
          />
        </div>
      </form>
      <div className="footer_btn">
        <Button className="btn-save1" onClick={handleSave}>
          Save
        </Button>
        <Link to ="/users">
        <Button className="cansel1" onClick={clearCustomerDetails}>
          Cancel
        </Button></Link>
      </div>
    </div>
  );
};
