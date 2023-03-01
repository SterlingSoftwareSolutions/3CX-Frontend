import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CustomerPopUp from "./Components/CustomerPopUp/CustomerPopUp";
import Dashboard from "./Pages/Dashboard/index";
import Users from "./Pages/User/index";
import Customers from "./Pages/Customers/index";
import SideNavBar from "./Components/SideNavBar/SideNavBar";
import Types from "./Components/Inquiries/Types";
import Login from "./Pages/LoginPage/index";
import { Col, Row } from "antd";
import Inquiry from "./Components/Inquiries/Inquiry";
import AllInquiry from "./Components/Inquiries/Inquiries";
import Errorpage from "./Pages/404/404";
import "react-datepicker/dist/react-datepicker.css";
import { Edituser } from "./Pages/User/EditUser";
import { Adduser } from "./Pages/User/Adduser";
import InquiryAdd from "./Components/Inquiries/InquiryAdd";
import EditInquiry from "./Components/Inquiries/EditInquiry";
import { AddCustomer } from "./Pages/Customers/AddCustomer";
import { Editcustomer } from "./Pages/Customers/Editcustomer";


function App() {
  const loggedInUser = localStorage.getItem("authenticated");
  const [authenticated, setauthenticated] = useState(
    loggedInUser ? loggedInUser : false
  );
  return (
    <div>
      <BrowserRouter>
        <Row>
          <Col span={4}>{authenticated ? <SideNavBar /> : ""}</Col>
          <Col span={20}>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/customer/:phone" element={<CustomerPopUp />} />
              <Route path="/types" element={<Types />} />
              <Route path="/inquiry-popup" element={<Inquiry />} />
              <Route path="/inquiries/" element={<AllInquiry />} />
              <Route path="/users" element={<Users />} />
              <Route path="/*" element={<Errorpage />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/edituser/:id" element={<Edituser />} />
              <Route path="/addnewuser" element={<Adduser />} />
              <Route path="/inquiryadd" element={<InquiryAdd />} />
              <Route path="/editinquiry/:id" element={<EditInquiry />} />
              <Route path="/addcustomer" element={<AddCustomer/>} />
              <Route path="/editcustomer/:phone"element={<Editcustomer/>} />
            </Routes>
          </Col>
        </Row>
      </BrowserRouter>
    </div>
  );
}

export default App;
