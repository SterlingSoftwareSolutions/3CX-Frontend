import React, { useEffect, useState } from "react";
import { Form, Modal, ModalHeader } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { fetchArray } from "../../Utils/utils";

const Types = () => {
  useEffect(() => {
    handleShow(true);
  }, []);

  //popup the page in this section
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");

  //save data localStorage
  useEffect(() => {
    localStorage.setItem("call_type_id", filter);
  }, [filter]);

  //Get api url
  const api = "/api/call_types";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  return (
    <Modal onHide={handleClose} show={show}>
      <ModalHeader>
        {/* page header title */}
        <Modal.Title>Types</Modal.Title>
      </ModalHeader>

      <Modal.Body>
        <Form>
          {/* set the option value  */}
          <Form.Select
            aria-label="Default select example"
            id="dataayselect"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form>
        <Modal.Footer>
          {/* close button */}
          <Link to="/customer/:phone">
            <Button
              className="btn btn mt-3"
              style={{ backgroundColor: "#16c5d5", color: "white" }}
              onClick={handleClose}
            >
              Back
            </Button>
          </Link>
          {/* Next button */}
          <Link to="/inquiry-popup">
            <Button
              className="btn btn mt-3"
              style={{ backgroundColor: "#16c5d5", color: "white" }}
            >
              Next
            </Button>
          </Link>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Types;
