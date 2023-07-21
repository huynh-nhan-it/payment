import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import jwt_decode from "jwt-decode";
import axios from "axios";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [token, setToken] = useState('');

  const onFinish = (values: LoginFormValues) => {
    // console.log("Form values:", values);
    axios.post("http://localhost:5005/api/Authen/Login", values)
    .then((response) => {
      // Handle successful login here, e.g., store the token in Local Storage or cookies
      console.log("Login successful!");
      setToken(response.data)

      localStorage.setItem("authToken", response.data);

    })
    .catch((error) => {
      // Handle login error here
      console.error("Login failed:", error);
    });
  };

 

  // var token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImYzNDRmNjVmLTRmM2ItNDQ2OC1iOTVkLTk3ZjQ2ZWM0NTIyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImdpYW5nbmd1eWVuLjAxMTIwQGdtYWlsLmNvbSIsImV4cCI6MTY5MDAwODU1MX0.mFVzi37oljAWPWiF4H3YC_m5ZjvZ4DxTVx6EDxDxap5lB9jLkxgqB6C0M65uR6nVuvQkNL5fqY_w2JRpX_HZQA";
  // var decoded = jwt_decode(token);

  // console.log(decoded);

  

  // decode header by passing in options (useful for when you need `kid` to verify a JWT):
  // var decodedHeader = jwt_decode(token, { header: true });
  // console.log(decodedHeader);
  //localhost:5005/api/PaymentRequest

  http: return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
        height: "100%",
        width: "100%",
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
