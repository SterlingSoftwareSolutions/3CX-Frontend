import { Button } from 'antd';
import React, { useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import './addcustomer.css';
import swal from 'sweetalert2';

export const AddCustomer = () => {

  const [postResult, setPostResult] = useState(null);
  const baseURL = "/api";

  const post_name = useRef(null);
  const post_phone = useRef(null);
  const post_email = useRef(null);
  const post_location = useRef(null);
  const post_comment = useRef(null);
  const post_address = useRef(null);
  const token = localStorage.getItem("token");

  const [message , setMessage] = useState([{
    name:'',
    phone:'',
    email:'',
    location:'',
    comment:'',
    address:''
  }]);

  const handleChange = event =>{
    setMessage(event.target.value);
  };

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  async function postData() {

    const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(post_phone.current.value)) {
    swal.fire({
      title: 'Error!',
      text: 'Please enter a valid phone number.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }
    const postData = {
      name: post_name.current.value,
      phone: post_phone.current.value,
      email: post_email.current.value,
      location: post_location.current.value,
      comment: post_comment.current.value,
      address:post_address.current.value,
    };
    try {
      
      const res = await fetch(`${baseURL}/customers`, {
        method: "POST",
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
      swal.fire({
        title: 'Success!',
        text: 'Your request has been processed successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      setPostResult(err.message);swal.fire({
        title: 'Error!',
        text: 'Please Check Again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

 
  return (
    <div className='container2'>
        <Link to ='/'><h6 className='linkhome'>Home </h6> </Link>
        <Link to ='/customers'><h6 className='link02'>/ Customer </h6> </Link>
        <h6 className='link03'>/ Add Customer</h6>
        <h4>Add Customer</h4>
       
        <div className="grid-containerone">
        <label>Phone Number </label>
        <input
          type="text"
          name="name"
          ref={post_phone}
          placeholder="Enter Customer Phone Number"
         // value={message}
         onChange={handleChange}
        />
        {/* {phoneError && <div className="error-message">{phoneError}</div>} */}
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          ref={post_email}
          placeholder="Enter Customer E-mail"
          // value={message}
          onChange={handleChange}
        />
       
        <label>Location</label>
        <input
          type="text"
          name="name"
          ref={post_location}
          placeholder="Enter Customer Location"
          // value={message}
          onChange={handleChange}
        />
      </div>

      <div className="grid_container_two">
        <label>Customer Name</label>
        <input
          type="text"
          name="name"
          ref={post_name}
          placeholder="Enter Customer Name"
          // value={message}
          onChange={handleChange}
        />
        
        <label>Customer Address</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Customer Address"
          ref={post_address}
          onChange={handleChange}
          // value={message}
        />
        <label>Comment</label>
        <textarea
          name="name"
          rows={2}
          placeholder="Enter Customer Commnet"
          ref={post_comment}
          onChange={handleChange}
          // value={message}
        />
      </div>

        <div className="container-btn1">
            <Button className='btn-save1' onClick={postData}>
              Save
            </Button>
            <Link to ="/customers">
            <Button className='cansel1'>Cansel</Button> </Link>
        </div>
       
    </div>
  )
}
