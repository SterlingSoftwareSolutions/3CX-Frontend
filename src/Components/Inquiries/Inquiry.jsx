import React, { useEffect, useState, forwardRef } from "react";
import { Form, Modal, ModalHeader, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Inquiry.css";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import moment from "moment";

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
  const [orderError, setOrderError] = useState("");
  const [inqError, setInqError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");
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
  const [followUpDate, setFollowUpDate] = useState(new Date());
  const [time, setTime] = useState(moment().format("hh:mm:ss"));

  //set path api
  const api = "/api/inquiries";
  const followUpApi = "/api/follow_ups";

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
    inquiry_id_ext: "",
    order_id: "",
  });

  const onChangeValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  //post method
  let handleSubmitOne = async (e) => {
    // console.log("text");
    if (!product_category) {
      setError("Field Required");
    } else {
      setError("");
      // console.log(product_category);
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
      data.brand_availability = brand_availability_selet;
      data.feedback = feedback;
      data.open = followOrCloseup;
      data.time = moment(followUpDate).format("YYYY-MM-DD") + " " + time;

      const response = await apiRequest(api, data);
      const Inquiry_id_new = response.data.id;

      const dataFollowup = {
        user_id: data.user_id,
        customer_id: data.customer_id,
        call_type_id: data.call_type_id,
        time: data.time,
        inquiry_id: Inquiry_id_new,
      };

      await apiRequest(followUpApi, dataFollowup);

      handleClose();
    }
  };

  let handleSubmitTwo = async (e) => {
    if (!data.order_id) {
      setOrderError("Field Required");
    } else {
      setOrderError("");
    }
    if (!data.inquiry_id_ext) {
      setInqError("Field Required");
    } else {
      setInqError("");
    }
    if (!followOrCloseup) {
      setFollowError("Field Required");
    } else {
      setFollowError("");
    }
    if (!followUpDate) {
      setDateError("Field Required");
    } else {
      setDateError("");
    }
    if (!time) {
      setTimeError("Field Required");
    } else {
      setTimeError("");
    }
    if (
      data.order_id &&
      data.inquiry_id_ext &&
      followOrCloseup &&
      followUpDate &&
      time
    ) {
      data.call_type_id = call_type_id;
      data.customer_id = customer_id;
      data.user_id = user_id;
      data.open = followOrCloseup;
      data.time = moment(followUpDate).format("YYYY-MM-DD") + " " + time;

      const response = await apiRequest(api, data);
      const Inquiry_id_new = response.data.id;

      const dataFollowup = {
        user_id: data.user_id,
        customer_id: data.customer_id,
        call_type_id: data.call_type_id,
        time: data.time,
        inquiry_id: Inquiry_id_new,
      };

      await apiRequest(followUpApi, dataFollowup);

      handleClose();
    }
  };

  let handleSubmitThree = async (e) => {
    if (!followOrCloseup) {
      setFollowError("Field Required");
    } else {
      setFollowError("");
    }
    if (!followUpDate) {
      setDateError("Field Required");
    } else {
      setDateError("");
    }
    if (!time) {
      setTimeError("Field Required");
    } else {
      setTimeError("");
    }
    if (followOrCloseup && followUpDate && time) {
      data.call_type_id = call_type_id;
      data.customer_id = customer_id;
      data.user_id = user_id;
      data.open = followOrCloseup;
      data.time = moment(followUpDate).format("YYYY-MM-DD") + " " + time;

      const response = await apiRequest(api, data);
      const Inquiry_id_new = response.data.id;

      const dataFollowup = {
        user_id: data.user_id,
        customer_id: data.customer_id,
        call_type_id: data.call_type_id,
        time: data.time,
        inquiry_id: Inquiry_id_new,
      };

      await apiRequest(followUpApi, dataFollowup);

      handleClose();
    }
  };

  let handleSubmitFour = async (e) => {
    if (!data.inquiry_id_ext) {
      setInqError("Field Required");
    } else {
      setInqError("");
    }
    if (!followOrCloseup) {
      setFollowError("Field Required");
    } else {
      setFollowError("");
    }
    if (!followUpDate) {
      setDateError("Field Required");
    } else {
      setDateError("");
    }
    if (!time) {
      setTimeError("Field Required");
    } else {
      setTimeError("");
    }
    if (data.inquiry_id_ext && followOrCloseup && followUpDate && time) {
      data.call_type_id = call_type_id;
      data.customer_id = customer_id;
      data.user_id = user_id;
      data.open = followOrCloseup;
      data.time = moment(followUpDate).format("YYYY-MM-DD") + " " + time;

      const response = await apiRequest(api, data);
      const Inquiry_id_new = response.data.id;

      const dataFollowup = {
        user_id: data.user_id,
        customer_id: data.customer_id,
        call_type_id: data.call_type_id,
        time: data.time,
        inquiry_id: Inquiry_id_new,
      };

      await apiRequest(followUpApi, dataFollowup);
      handleClose();
    }
  };

  let apiRequest = async (followUpApi, apiData) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(apiData),
    };
    const response = await fetch(followUpApi, requestOptions).then((response) =>
      response.json()
    );
    console.log(response);
    return response;
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div>
      <Modal
        onHide={handleClose}
        show={show}
        backdrop="static"
        keyboard={false}
      >
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
                    onChange={(e) => onChangeValue("order_id", e.target.value)}
                    id="order_id"
                    value={data.order_id}
                    type="text"
                    placeholder="Order ID"
                  />
                  <p className="form-validation">{orderError}</p>
                </Form.Group>
                {/* Inquiry Id text line */}
                <Form.Group className="mb-3">
                  <Form.Label>Inquiry ID</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      onChangeValue("inquiry_id_ext", e.target.value)
                    }
                    id="inquiry_id"
                    value={data.inquiry_id_ext}
                    type="text"
                    placeholder="Inquiry ID"
                  />
                  <p className="form-validation">{inqError}</p>
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
                      onChangeValue("inquiry_id_ext", e.target.value)
                    }
                    id="inquiry_id"
                    value={data.inquiry_id_ext}
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

            {followOrCloseup == "1" ? (
              <div>
                {/* Select Date */}
                <Form.Group>
                  <Form.Label>Follow Up Date</Form.Label>
                  <DatePicker
                    selected={followUpDate}
                    onSelect={(date) => setFollowUpDate(date)}
                    dateFormat="MM/dd/yyyy"
                  />
                  <p className="form-validation">{dateError}</p>
                </Form.Group>
                {/* Select Time */}
                <Form.Group>
                  <Form.Label>Follow Up Time</Form.Label>
                  <Row>
                    <TimePicker
                      value={time}
                      onChange={(time) => setTime(time)}
                    />
                    <p className="form-validation">{timeError}</p>
                  </Row>
                </Form.Group>
              </div>
            ) : (
              <></>
            )}

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
            onClick={(e) => {
              if (localState.call_type_group_id === 1) handleSubmitOne(e);
              if (localState.call_type_group_id === 2) handleSubmitTwo(e);
              if (localState.call_type_group_id === 3) handleSubmitThree(e);
              if (localState.call_type_group_id === 4) handleSubmitFour(e);
              if (localState.call_type_group_id === 5) handleSubmitThree(e);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inquiry;
