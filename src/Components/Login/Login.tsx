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
  function isJWTToken(str: string): boolean {
    const jwtRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;
    return jwtRegex.test(str);
  }
  
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
        console.log(response.data);
        console.log(isJWTToken(response.data));
        if(isJWTToken(response.data)){
          localStorage.setItem("authToken", response.data);
        }
        // Save token in Local Storage
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
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
      }}>
      <Form<LoginFormValues>
        style={{
          width: "400px",
          height: "400px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          border: "solid #ccc 0.1px",
        }}
        onFinish={onFinish}>
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
