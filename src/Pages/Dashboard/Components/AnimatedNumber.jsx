import React, { useEffect, useState } from "react";
import { ReactComponent as Users } from "../../../Assets/users.svg";
import { ReactComponent as InBoundCalls } from "../../../Assets/incomingcalls.svg";
import { ReactComponent as OpenInquiry } from "../../../Assets/open.svg";
import { ReactComponent as ClosedInquiries } from "../../../Assets/closed.svg";
import { ReactComponent as OutBoundCalls } from "../../../Assets/outgoingcalls.svg";
import "../index.css";
import NumberCards from "../../../Components/NumberCards";
import { Card, Col, Row } from "antd";

const AnimatedNumber = () => {
  const token = localStorage.getItem("token");
  const [totalAgents, setTotalAgentData] = useState([]);
  const [TotalInquiries, setTotalInquiriestData] = useState([]);
  const [Resolvedinquiries, setResolvedinquiriesData] = useState([]);
  const [Unesolvedinquiries, setUnesolvedinquiriesData] = useState([]);

  useEffect(() => {
    // Api call For the User Count
    fetch("/api/users/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setTotalAgentData(body.data.agents);
      })
      .catch(() => {
        console.log("Error in User Count Api in Dashboard");
      });

      // Api call For the inquiries Count
    fetch("/api/inquiries/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setTotalInquiriestData(body.data.total);
        setResolvedinquiriesData(body.data.closed);
        setUnesolvedinquiriesData(body.data.open);
      })
      .catch(() => {
        console.log("Error in inquiries Count Api in Dashboard");
      });
  }, []);
  return (
    <Card style={{ width: "97%" }}>
      <Row>
        <div className="card-one-style">
          <Row>
            <Col className="col-one-style">
              <Users />
            </Col>
            <Col>
              <p className="number-style">
                <NumberCards value={totalAgents} />
              </p>
              <p>Total Agents</p>
            </Col>
          </Row>
        </div>
        {/* <div className="card-one-style">
          <Row>
            <Col className="col-one-style">
              <InBoundCalls />
            </Col>
            <Col>
              <p className="number-style">
                <NumberCards value={44} />
              </p>
              <p>InBound Calls Per Day</p>
            </Col>
          </Row>
        </div>
        <div className="card-one-style">
          <Row>
            <Col className="col-one-style">
              <OutBoundCalls />
            </Col>
            <Col>
              <p className="number-style">
                <NumberCards value={52} />
              </p>
              <p>OutBound Calls Per Day</p>
            </Col>
          </Row>
        </div> */}
         <div className="card-one-style">
          <Row>
            <Col className="col-one-style">
              <OutBoundCalls />
            </Col>
            <Col>
              <p className="number-style">
                <NumberCards value={TotalInquiries} />
              </p>
              <p>Total Inquiries</p>
            </Col>
          </Row>
        </div> 
        <div className="card-one-style">
          <Row>
            <Col className="col-one-style">
              <ClosedInquiries />
            </Col>
            <Col>
              <p className="number-style">
                <NumberCards value={Resolvedinquiries} />
              </p>
              <p>Resolved Inquiries</p>
            </Col>
          </Row>
        </div>
        <div className="card-one-style">
          <Row>
            <Col className="col-one-style">
              <OpenInquiry />
            </Col>
            <Col>
              <p className="number-style">
                <NumberCards value={Unesolvedinquiries} />
              </p>
              <p>Unresolved Inquiries</p>
            </Col>
          </Row>
        </div>
      </Row>
    </Card>
  );
};

export default AnimatedNumber;
