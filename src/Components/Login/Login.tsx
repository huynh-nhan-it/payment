import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onFinish = (values: LoginFormValues) => {
    // ... handle login logic
    axios
      .post("http://localhost:5005/api/Authen/Login", values)
      .then((response) => {
        // Handle successful login here, e.g., store the token in Local Storage
        console.log("Login successful!");
        setToken(response.data);

        // Save token in Local Storage
        localStorage.setItem("authToken", response.data);
      })
      .catch((error) => {
        // Handle login error here
        console.error("Login failed:", error);
      });
  };

  useEffect(() => {
    if (token) {
      window.location.reload();
      navigate("/");
    }
  }, [token]);
  // const onFinish = (values: LoginFormValues) => {
  //   // console.log("Form values:", values);
  //   axios
  //     .post("http://localhost:5005/api/Authen/Login", values)
  //     .then((response) => {
  //       // Handle successful login here, e.g., store the token in Local Storage or cookies
  //       // console.log("Login successful!");
  //       setToken(response.data);
  //       console.log(response.data);

  //       localStorage.setItem("authToken", response.data);
  //       // navigate("/");
  //       setIsLoggedIn(true);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       // Handle login error here
  //       console.error("Login failed:", error);
  //     });
  // };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
        height: "100%",
        width: "500px",
        backgroundColor: "#fff",
        border: "solid #ccc 0.1px",
      }}>
      <Form<LoginFormValues> onFinish={onFinish}>
        <Form.Item
          name="email"
          label="email"
          rules={[{ required: true, message: "Please enter your email" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
