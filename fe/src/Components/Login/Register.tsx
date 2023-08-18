import { Form, Input, Button, Divider } from "antd";
import React, { useState } from "react";
import request from "../../Services/User/getAccount";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  phoneNumber: string;
}

const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const onFinish = (values: RegisterFormValues) => {
    // ... handle login logic
    const register = async () => {
      const endpoint = `Authen/Register`;
      const response = await request.post(endpoint, values).then((res) => {
        console.log(res.data);
        if (res.data.mess === "Success") {
          console.log(values);
          // console.log(values);
          setSuccess(res.data.mess);
          setError("");
        } else {
          if (res.data.mess === "PASSWORD KO TRÙNG KHỚP") {
            setError(res.data.mess);
          } else {
            setError(res.data);
          }
          setSuccess("");
        }
        // setData(res.data);
        // se(res.data);
      });
    };
    register();

    // Set the desired timeout value (in milliseconds)
  };
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/login");
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
      <Form<RegisterFormValues>
        style={{
          width: "500px",
          height: "540px",
          padding: "40px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius:"4px",
          border: "solid #ccc 0.1px",
        }}
        onFinish={onFinish}>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "Please enter your first name" }]}>
          <Input
            placeholder="Enter your first name"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "Please enter your last name" }]}>
          <Input placeholder="Enter your last name" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}>
          <Input placeholder="Enter your email" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}>
          <Input placeholder="Enter password" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="confirmpassword"
          rules={[
            { required: true, message: "Please enter your confirm password" },
          ]}>
          <Input
            placeholder="Enter confirm password"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}>
          <Input placeholder="Enter phone number" style={{ width: "100%" }} />
        </Form.Item>
        {success === "Success" ? (
          <div style={{ color: "green", margin: 8 }}>{success}</div>
        ) : (
          <div style={{ color: "red", margin: 8 }}>{error}</div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
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
            onClick={handleNavigateToLogin}>
            Login
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
