import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import "./edituser.css";
import { Link, useParams,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const Edituser = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState({
    name: "",
    email: "",
    role: ""
  });
  
  
  //  clear function
  const clearCustomerDetails = () => {
    setData({
      name: "",
      email: "",
      role: "",
    });
  };


  const fetchLocationsUsers = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.set("inquiry", id);

    var url = window.location.href;
    var user_id = url.substring(url.lastIndexOf("/") + 1);
    console.log(user_id);
    const headers = new Headers({
      Authorization: "Bearer " + token,
    });

    try {
      let fetchData = await fetch(`/api/users/${user_id}`, {
        headers
      });
      fetchData = await fetchData.json();
    
      if (fetchData && fetchData.data && fetchData.data.length > 0) {
        // update the state with the correct data
        setData(fetchData);
      } else if (fetchData.error) {
        throw new Error(fetchData.error);
      }
    } catch (error) {
      console.error(error);
    }
    
  }, [id, token]);

  console.log(data);

  useEffect(() => {
    fetchLocationsUsers();
  }, [fetchLocationsUsers]);


  const handleNameChange = (event) => {
   setData({ ...data, name: event.target.value });
  };

  const handleEmailChange = (event) => {
   setData({ ...data, email: event.target.value });
  };

  const handleRoleChange = (event) => {
   setData({ ...data, role: event.target.value });
  };

 
  const handleSave = async () => {
    try {
      const headers = new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      });
  
      const response = await fetch(`/api/users/${id}`, {
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
       navigate('/users/');

      } else {
        throw new Error("Failed to save users");
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
            value={data.name}
            onChange={handleNameChange}
            placeholder="Enter User Number"
          />

          <label>User Role</label>
          <input
            type="text"
            placeholder="Enter User Number"
            onChange={handleRoleChange}
            value={data.role}
          />
        </div>

        <div className="grid-container-two">
          <label>User E-mail</label>
          <input
            type="email"
            value={data.email}
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
