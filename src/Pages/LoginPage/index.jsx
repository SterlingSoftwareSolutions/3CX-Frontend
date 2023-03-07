import React, { useState } from "react";
import "./index.css";
import { Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        alert(data.error);
        //admin login role
      } else if (data.data.user.role === "admin") {
        localStorage.setItem("role", data.data.user.role);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("authenticated", true);
        setauthenticated(true);
        navigate("/"); // set location
        window.location.reload();
      } else {
        localStorage.setItem("user_role", data.data.user.role); //old feature  user_id,data.data.user.id
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("authenticated", true);
        setauthenticated(true);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setError("Username or Password is Incorrect");
    }
  };

  return (
    <Card
      title="Login"
      headStyle={{ fontSize: "24px" }}
      className="title-style"
      style={{ boxShadow: "0 0 5px rgba(0,0,0,1" }}>
      <Form>
        <div className="row-style">
          <p>
            Email <span style={{ color: "red" }}>*</span>
          </p>
          <Form.Item
            className="input-style"
            name="email"
            onChange={(e) => setUsername(e.target.value)}
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input />
          </Form.Item>
        </div>
        <div>
          <p>
            Password <span>*</span>
          </p>
          <Form.Item
            className="input-style"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password />
          </Form.Item>
          <p className="error">{error}</p>
        </div>

        <div className="d-grid">
          <button onClick={handleSubmit} type="submit" className="button-style">
            Login
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default LoginPage;
