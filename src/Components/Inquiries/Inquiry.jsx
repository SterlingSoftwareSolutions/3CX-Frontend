import React, { useEffect, useState, useContext, createContext } from "react";
import { Form, Modal, ModalHeader, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Inquiry.css";
import { Link, useLocation } from "react-router-dom";

const Inquiry = (props) => {
  useEffect(() => {
    handleShow(true);
  }, []);
  const location = useLocation();
  const [localState, setLocalState] = useState(location.state.object);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [producterror, setError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [brandAvierror, setBrandAviError] = useState("");
  const [feedbackerror, setFeedbackError] = useState("");
  const [followerror, setFollowError] = useState("");
  const token = localStorage.getItem("token");
  const call_type_id = localStorage.getItem("call_type_id");
  const user_id = localStorage.getItem("user_id");
  const customer_id = localStorage.getItem("customer_id");
  const [product_category, setproduct_category] = useState("");
  const [brand_availability_selet, set_select_brand_availability] =
    useState("");
  const [feedback, setfeedback] = useState("");
  const [followOrCloseup, setfollowOrCloseup] = useState("");
  const [filter, setFilter] = useState("");
  const [arr, setArr] = useState([
    { name: " " },
    { name: "TV" },
    { name: "Mobile Phone" },
    { name: "Air Conditioners" },
    { name: "Apple Products" },
    { name: "Audio" },
    { name: "Computers" },
    { name: "Refrigerator " },
    { name: "Washing Machine" },
    { name: "Home Appliances" },
    { name: "Kitchen Appliances" },
    { name: "Built-In Appliances & Ovens" },
    { name: "Small Appliances" },
    { name: "Watch" },
    { name: "Generators" },
    { name: "The Face Shop" },
    { name: "Skechers" },
    { name: "Under Armour" },
    { name: "Hyundai" },
    { name: "Bathware" },
    { name: "Sanitary Ware" },
    { name: "Medical Devices" },
    { name: "Cooking Appliances" },
    { name: "Clothing" },
    { name: "Home Needs" },
    { name: "Health & Beauty" },
    { name: "Baby & Kids" },
    { name: "Sports & Fitness" },
    { name: "Daily Essentials" },
    { name: "Special Offer" },
    { name: "Other" },
  ]);
  const [brand_availability] = useState([
    { name: " " },
    { name: "Yes" },
    { name: "No" },
  ]);
  const [followupStatus] = useState([
    { id: "", name: " " },
    { id: 1, name: "Follow Up" },
    { id: 0, name: "Close" },
  ]);
  const [feedbacks] = useState([
    { feedback: " " },
    { feedback: "Not Intrested" },
    { feedback: "Actively Purchasing" },
    { feedback: "Pending Purchasing" },
    { feedback: "Purchase from different store" },
    { feedback: "Discounted amount not worth" },
    { feedback: "No answer" },
    { feedback: "Looking for Insallment plan - No credit Card" },
  ]);

  //set path api
  const api = "/api/inquiries";

  const [data, setData] = useState({
    brand: "",
    brand_availability: "",
    open: "",
    status_remark: "",
    feedback: "",
    product_category: "",
    user_id: "",
    customer_id: "",
    call_type_id: "",
  });

  const onChangeValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  //post method
  let handleSubmit = async (e) => {
    //error message
    // if (
    //   !data.product_category &&
    //   !data.brand &&
    //   !data.availibility &&
    //   !data.follow &&
    //   !data.open
    // ) {
    //   setError(true);
    //   setBrandError(true);
    //   setBrandAviError(true);
    //   setFeedbackError(true);
    //   setFollowError(true);
    // } else if (!data.product_category) {
    //   setError(true);
    //   setBrandError(false);
    //   setBrandAviError(false);
    //   setFeedbackError(false);
    //   setFollowError(false);
    // } else if (!data.brand) {
    //   setError(false);
    //   setBrandError(true);
    //   setBrandAviError(false);
    //   setFeedbackError(false);
    //   setFollowError(false);
    // } else if (!data.availibility) {
    //   setError(false);
    //   setBrandError(false);
    //   setBrandAviError(true);
    //   setFeedbackError(false);
    //   setFollowError(false);
    // } else if (!data.follow) {
    //   setError(false);
    //   setBrandError(false);
    //   setBrandAviError(false);
    //   setFeedbackError(true);
    //   setFollowError(false);
    // } else if (!data.open) {
    //   setError(false);
    //   setBrandError(false);
    //   setBrandAviError(false);
    //   setFeedbackError(false);
    //   setFollowError(true);
    // }
    if (!product_category) {
      setError("Field Required");
    } else {
      setError("");
      console.log(product_category);
    }
    if (!data.brand) {
      setBrandError("Field Required");
    } else {
      setBrandError("");
    }
    if (!brand_availability_selet) {
      setBrandAviError("Field Required");
    } else {
      setBrandAviError("");
    }
    if (!feedback) {
      setFeedbackError("Field Required");
    } else {
      setFeedbackError("");
    }
    if (!followOrCloseup) {
      setFollowError("Field Required");
    } else {
      setFollowError("");
    }
    if (
      product_category &&
      data.brand &&
      brand_availability_selet &&
      feedback &&
      followOrCloseup
    ) {
      data.call_type_id = call_type_id;
      data.customer_id = customer_id;
      data.user_id = user_id;
      data.product_category = product_category;
      data.user_id = user_id;
      data.brand_availability = brand_availability_selet;
      data.feedback = feedback;
      data.open = followOrCloseup;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      };
      const responce = await fetch(api, requestOptions).then((response) =>
        response.json()
      );
      console.log(JSON.stringify(responce));
      handleClose();
    }
  };
  // console.log(producterror);
  // // console.log(setBrandError);
  // console.log(setBrandAviError);
  // console.log(setFeedbackError);
  // console.log(setFollowError);

  //required field
  return (
    <div>
      <Modal onHide={handleClose} show={show}>
        <ModalHeader>
          {/* page header title */}
          <Modal.Title>Add Inquiry</Modal.Title>
        </ModalHeader>

        <Modal.Body>
          <Form>
            {/* do not change == to === */}
            {localState.call_type_group_id == "1" ? (
              <div>
                <Form.Group className="mb-3">
                  {/* Product Category */}
                  <Form.Label>Product Category</Form.Label>
                  <Form.Select
                    aria-label="Product Category"
                    id="product_category"
                    value={product_category}
                    onChange={(e) => setproduct_category(e.target.value)}
                  >
                    {arr.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="form-validation">{producterror}</p>
                </Form.Group>

                {/* Brand or Model text line */}
                <Form.Group className="mb-3">
                  <Form.Label>Brand or Model</Form.Label>
                  <Form.Control
                    onChange={(e) => onChangeValue("brand", e.target.value)}
                    id="brand"
                    value={data.brand}
                    type="text"
                    placeholder="Brand or Model"
                  />
                  <p className="form-validation">{brandError}</p>
                  {/* error message */}
                </Form.Group>

                {/* Brand Availablility */}
                <Form.Group className="mb-3">
                  <Form.Label>Brand Availablility</Form.Label>
                  <Form.Select
                    aria-label="Brand Availablility"
                    id="brandcd_availability"
                    onChange={(e) =>
                      set_select_brand_availability(e.target.value)
                    }
                    value={brand_availability_selet}
                  >
                    {brand_availability.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="form-validation">{brandAvierror}</p>
                </Form.Group>

                {/* Feedback */}
                <Form.Group className="mb-3">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Select
                    aria-label="Feedback"
                    id="arrayselect"
                    value={feedback}
                    onChange={(e) => setfeedback(e.target.value)}
                  >
                    {feedbacks.map((item, index) => (
                      <option key={index} value={item.feedback}>
                        {item.feedback}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="form-validation">{feedbackerror}</p>
                </Form.Group>
              </div>
            ) : (
              <></>
            )}
            {/* do not change == to === */}
            {localState.call_type_group_id == "2" ? (
              <div>
                {/* Order ID text line */}
                <Form.Group className="mb-3">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      onChangeValue("status_remark", e.target.value)
                    }
                    id="order_id"
                    value={data.status_remark}
                    type="text"
                    placeholder="Order ID"
                  />
                </Form.Group>
                {/* Inquiry Id text line */}
                <Form.Group className="mb-3">
                  <Form.Label>Inquiry ID</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      onChangeValue("status_remark", e.target.value)
                    }
                    id="inquiry_id"
                    value={data.status_remark}
                    type="text"
                    placeholder="Inquiry ID"
                  />
                </Form.Group>
              </div>
            ) : (
              <></>
            )}
            {/* do not change == to === */}
            {localState.call_type_group_id == "4" ? (
              <div>
                {/* Inquiry Id text line */}
                <Form.Group className="mb-3">
                  <Form.Label>Inquiry ID</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      onChangeValue("status_remark", e.target.value)
                    }
                    id="inquiry_id"
                    value={data.status_remark}
                    type="text"
                    placeholder="Inquiry ID"
                  />
                </Form.Group>
              </div>
            ) : (
              <></>
            )}

            {/* Follow or Closeup */}
            <Form.Group className="mb-3">
              <Form.Label>Follow or Closeup</Form.Label>
              <Form.Select
                aria-label="action"
                id="action"
                value={followOrCloseup}
                onChange={(e) => setfollowOrCloseup(e.target.value)}
              >
                {followupStatus.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <p className="form-validation">{followerror}</p>
              {/* error message */}
              {/* {followerror ? (
                <Form.Label className="form-validation">
                  This field is required
                </Form.Label>
              ) : (
                ""
              )} */}
            </Form.Group>

            {/* Status Remark text line */}
            <Form.Group className="mb-3">
              <Form.Label>Status Remark</Form.Label>
              <Form.Control
                onChange={(e) => onChangeValue("status_remark", e.target.value)}
                id="status_remark"
                value={data.status_remark}
                type="text"
                placeholder="Status Remark"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {/* close button */}
          <Link to="/types">
            <Button
              className="btn btn mt-3"
              style={{ backgroundColor: "#16c5d5", color: "white" }}
            >
              Back
            </Button>
          </Link>
          {/* Next button */}

          <Button
            className="btn btn mt-3"
            style={{ backgroundColor: "#16c5d5", color: "white" }}
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inquiry;
