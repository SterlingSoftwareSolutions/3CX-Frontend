import { Button } from 'antd';
import React, { useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import './addcustomer.css';


export const AddCustomer = () => {

  const [postResult, setPostResult] = useState(null);
  const baseURL = "/api";

  const post_name = useRef(null);
  const post_phone = useRef(null);
  const post_email = useRef(null);
  const post_location = useRef(null);
  const post_comment = useRef(null);
  const token = localStorage.getItem("token");

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  async function postData() {
    const postData = {
      name: post_name.current.value,
      phone: post_phone.current.value,
      email: post_email.current.value,
      location: post_location.current.value,
      comment: post_comment.current.value,
    };
    try {
      const res = await fetch(`${baseURL}/customers`, {
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
    } catch (err) {
      setPostResult(err.message);
    }
  }

  const clearPostOutput = () => {
    setPostResult(null);
  }

  return (
    <div className='container1'>
        <Link to ='/'><h6 className='link01'>Home </h6> </Link>
        <Link to ='/customers'><h6 className='link02'>/ Customer </h6> </Link>
        <h6 className='link03'>/ Add Customer</h6>
        <h4>Add Customer</h4>
       
        <div className="grid-container">
        <label>Phone Number </label>
        <input
          type="number"
          name="name"
          ref={post_phone}
          placeholder="Enter Customer Phone Number"
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          ref={post_email}
          placeholder="Enter Customer E-mail"
        />
        <label>Location</label>
        <input
          type="text"
          name="name"
          ref={post_location}
          placeholder="Enter Customer Location"
        />
      </div>

      <div className="grid-container-two">
        <label>Customer Name</label>
        <input
          type="text"
          name="name"
          ref={post_name}
          placeholder="Enter Customer Name"
        />
        <label>Customer Address</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Customer Address"
        />
        <label>Comment</label>
        <textarea
          name="name"
          rows={2}
          placeholder="Enter Customer Commnet"
          ref={post_comment}
        />
      </div>

        <div className="container-btn">
            <Button className='btn-save' onClick={postData}>
              Save
            </Button>
            <Button className='cansel' onClick={clearPostOutput}>Cansel</Button>
        </div>
       
    </div>
  )
}
