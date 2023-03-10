import { Col, Row } from "antd";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./index.css";
import AnimatedNumber from "./Components/AnimatedNumber";
import AgentList from "./Components/AgentList";
import PieCharts from "./Components/PieCharts";
import { InboundCall } from "./Components/InboundCall";
import { OutboundAns } from "./Components/OutboundAns";
import { OutboundnotAns } from "./Components/OutboundnotAns";



const projectdata = [
  { name: "Abans", value: 207 },
  { name: "Koko", value: 302 },
  { name: "Big Deals", value: 159 },
];

const agentdata = [
  { name: "John", value: 54 },
  { name: "David", value: 67 },
  { name: "Katy", value: 61 },
  { name: "Jane", value: 51 },
  { name: "Kevin", value: 71 },
];

const inbounddata = [
  { name: "Abans", value: 89 },
  { name: "Koko", value: 98 },
  { name: "Big Deals", value: 75 },
];

const outbounddata = [
  { name: "Abans", value: 76 },
  { name: "Koko", value: 94 },
  { name: "Big Deals", value: 81 },
];

const resolveddata = [
  { name: "Abans", value: 31 },
  { name: "Koko", value: 54 },
  { name: "Big Deals", value: 41 },
];

const unresolveddata = [
  { name: "Abans", value: 12 },
  { name: "Koko", value: 7 },
  { name: "Big Deals", value: 6 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#fc4242"];

const Dashboard = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const loggedInUser = localStorage.getItem("authenticated");
  const [userRole, setUserRole] = useState(""); // logged role
  const [authenticated, setauthenticated] = useState(
    loggedInUser ? loggedInUser : false
  );

  useEffect(() => {
    if (loggedInUser) {
      setauthenticated(true);
      const role = localStorage.getItem("role");
      setUserRole(role);
    }
  }, []);

  if (userRole === "admin") {
    return (
      <div className="dashboard-row">
      <Row style={{ marginTop: "6%", width: "1100px" }}>
        <AnimatedNumber />
      </Row>
      <Row style={{ marginTop: "1%", width: "1100px" }}>
        <Col span={16}></Col>
        <Col span={8}>
          <AgentList />
        </Col>
      </Row>
      <Row className="dashboard-chart">
        <Col className="dashboard-char1" span={6}>
          <PieCharts />
        </Col>
        <Col className="dashboard-chart2" span={6}>
          <InboundCall />
        </Col>
        <Col className="outbound-call-ansewer" span={6}>
        <OutboundAns/>
        </Col>
        <Col className="outbound-call-notanswer" span={6}>
         <OutboundnotAns/>
        </Col>
      </Row>
    </div>
    );
  } else if (userRole === "user") {
    return <div style={{ fontSize: "200px" }}>Welcome User!</div>;
  } else if (!authenticated) {
    return <Navigate replace to="/login" />;
  }

  // if (!authenticated) {
  //   return <Navigate replace to="/login" />;
  // }
  else {
    return (
      <div className="dashboard-row">
        <Row style={{ marginTop: "6%", width: "1100px" }}>
          <AnimatedNumber />
        </Row>
        <Row style={{ marginTop: "1%", width: "1100px" }}>
          <Col span={16}></Col>
          <Col span={8}>
            <AgentList />
          </Col>
        </Row>
      </div>
    );
  }
};

export default Dashboard;
