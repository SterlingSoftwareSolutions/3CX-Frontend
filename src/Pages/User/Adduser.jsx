import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import "./adduser.css";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Adduser = () => {

  const [postResult, setPostResult] = useState(null);
  const baseURL = "/api";
  const token = localStorage.getItem("token");

  const post_name  = useRef(null);
  const post_email = useRef(null);
  const post_password = useRef(null);
  const post_Confirmpassword = useRef(null);
  const post_Role = useRef(null);

  const [message , setMessage] = useState([{
    name:'',
    email:'',
    password:'',
    Confirmpassword:'',
    role :'',
  }]);

  const handleChange = event =>{
    setMessage(event.target.value);
  };

  const handleClick =() =>{
    setMessage([...message,{
      name:'',
      email:'',
      password:'',
      Confirmpassword:'',
      options:'',
      role:'',
    }]);
  }
  function validatePassword(password, confirmPassword) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const validPassword = passwordRegex.test(password);
    const matchConfirmPassword = password === confirmPassword;
  
    if (!validPassword) {
      throw new Error("Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number");
    }
  
    if (!matchConfirmPassword) {
      throw new Error("Passwords do not match");
    }
  }
  
  // const [selectedOption, setSelectedOption] = useState("");
  // const options = ["Admin", "User", "Agent"];

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function postData() {
    const postData = {
      name: post_name.current.value,
      password: post_password.current.value,
      email: post_email.current.value,
     // Confirmpassword: post_Confirmpassword.current.value,
     // options:selectedOption.current.value,
     role:post_Role.current.value,
    };
   
    try {
      validatePassword(post_password.current.value, post_Confirmpassword.current.value);
      const res = await fetch(`${baseURL}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      setPostResult(fortmatResponse(result));
      Swal.fire({
        icon: 'success',
        title: 'User added successfully',
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (err) {
      setPostResult(err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  }

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
          ref={post_name}
         // value={message}
          onChange={handleChange}
          placeholder="Enter User Number"
        />
        <label>password</label>
        <input
          type="password"
         // value={message}
          ref={post_password}
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
        <label>User Role</label>
        {/* <select value={selectedOption} onChange={handleOptionChange}>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select> */}
        <input
          type="Role"
          ref={post_Role}
         // value={message}
          onChange={handleChange}
          placeholder="Enter User Role"
        />

      </div>

      <div className="grid-container-two">
        <label>User E-mail</label>
        <input
          type="email"
          ref={post_email}
         // value={message}
          onChange={handleChange}
          placeholder="Enter User E-mail"
        />
        <label>Confirm password</label>
        <input
          type="password"
          ref={post_Confirmpassword}
         // value={message}
          onChange={handleChange}
          placeholder="Enter Your Password"
        />
      </div>

      <div className="container-btn">
        <Button className="btn-save" onClick={postData}>
          Save
        </Button>
        <Button className="cansel" onClick={""}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
