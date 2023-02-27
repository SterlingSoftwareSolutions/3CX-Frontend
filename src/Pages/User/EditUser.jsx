import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./edituser.css";
import { Link, useParams } from "react-router-dom";

export const Edituser = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [usetDetails, setUsetDetails] = useState({
    name: "",
    email: "",
    role: "",
    id,
  });

  //  clear function
  const clearCustomerDetails = () => {
    setUsetDetails({
      name: "",
      email: "",
      role: "",
    });
  };

  const fetchArray = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("userid", id);

    const headers = new Headers({
      Authorization: "Bearer " + token,
    });
    try {
      let fetchData = await fetch(`/api/users/?${queryParams}`, {
        headers,
      });
      fetchData = await fetchData.json();
      if (fetchData) {
        console.log(fetchData,'00000');
        setUsetDetails(fetchData);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleNameChange = (event) => {
    setUsetDetails({ ...usetDetails, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUsetDetails({ ...usetDetails, email: event.target.value });
  };

  const handleRoleChange = (event) => {
    setUsetDetails({ ...usetDetails, role: event.target.value });
  };

  //calling Api get method
  useEffect(() => {
    fetchArray();
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
        body: JSON.stringify(usetDetails),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // If the request was successful, redirect the user to the customer list page
      window.location.href = "/users";
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
      <form>
        <div className="grid-container">
          <label>User Name</label>
          <input
            type="text"
            value={usetDetails.name}
            onChange={handleNameChange}
            placeholder="Enter User Number"
          />

          <label>User Role</label>
          <input
            type="text"
            placeholder="Enter User Number"
            onChange={handleRoleChange}
            value={usetDetails.role}
          />
        </div>

        <div className="grid-container-two">
          <label>User E-mail</label>
          <input
            type="email"
            value={usetDetails.email}
            onChange={handleEmailChange}
            placeholder="Enter User E-mail"
          />
        </div>
      </form>
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
