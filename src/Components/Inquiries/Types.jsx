import React, { useEffect, useState, useContext, createContext } from "react";
import { Form, Modal, ModalHeader } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { fetchArray } from "../../Utils/utils";

const Types = () => {
  useEffect(() => {
    handleShow(true);
  }, []);
  const navigate = useNavigate();
  //popup the page in this section
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  //calling Api get method
  const handleSubmit = () => {
    navigate("/inquiry-popup", {
      state: {
        object: object,
      },
    });
  };
  {
    /* do not change == to === */
  }
  const object = filter ? data.find((obj) => obj.id == filter) : data[0];

  return (
    <Modal onHide={handleClose} show={show} backdrop="static" keyboard={false}>
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
          <Button
            className="btn btn mt-3"
            onClick={handleSubmit}
            style={{ backgroundColor: "#16c5d5", color: "white" }}
          >
            Next
          </Button>
          {/* </Link> */}
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Types;
