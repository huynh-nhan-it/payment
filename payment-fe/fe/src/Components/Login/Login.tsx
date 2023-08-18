import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IdcardFilled } from "@ant-design/icons";
import request from "../../Services/User/getAccount";

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
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onFinish = (values: LoginFormValues) => {
    // ... handle login logic
    const login = async () => {
      const endpoint = `Authen/Login`;
      const response = await request.post(endpoint, values).then((res) => {
        // console.log(res.data);
        // setData(res.data);
        // se(res.data);
        if(isJWTToken(res.data)){
          console.log()
          localStorage.setItem("authToken", res.data);
          const decoded: { [key: string]: string } = jwt_decode(res.data);
          setToken(res.data)
          // Access the emailaddress property
          const id =
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          const role = decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
          // console.log(decoded);

          setId(id);
          localStorage.setItem("id", id);
          localStorage.setItem("role", role);
        }else{
          setError(res.data)
        }
      });
    };
    login();

    // axios
    //   .post("http://localhost:5005/api/Authen/Login", values)
    //   .then((response) => {
    //     // Handle successful login here, e.g., store the token in Local Storage
    //     console.log("Login successful!");
    //     setToken(response.data);
    //     console.log(response.data);
    //     console.log(isJWTToken(response.data));
        // if(isJWTToken(response.data)){
        //   localStorage.setItem("authToken", response.data);
        //   const decoded: { [key: string]: string } = jwt_decode(response.data);

        //   // Access the emailaddress property
        //   const id =
        //     decoded[
        //       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        //     ];
        //   // console.log(decoded);

        //   setId(id);
        //   localStorage.setItem("id", id);

    //       // localStorage.setItem("Id",)
    //     }
    //     // Save token in Local Storage
    //   })
    //   .catch((error) => {
    //     // Handle login error here
    //     console.error("Login failed:", error);
    //   });
  };

  // console.log(error);
  useEffect(() => {
    if (token) {
      window.location.href='/'
      navigate("/");
    }
  }, [token]);

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

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
          width: "500px",
          height: "300px",
          padding: "40px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius:"4px",
          border: "solid #ccc 0.1px",
        }}
        onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}>
          <Input placeholder="Enter your email" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: error }]}>
          <Input
            type="password"
            placeholder="Enter password"
            style={{ width: "100%" }}
          />
        </Form.Item>
        {error && <div style={{ color: 'red', margin:8 }}>{error}</div>}
      
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Divider />

        <Form.Item>
          <button
            style={{
              padding: "8px 15px",
              background: "green",
              color: " #fff",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={handleNavigateToRegister}>
            Register
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
