import React from "react";
import { Form, Input, Button } from "antd";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Form values:", values);
  };



  return (
    <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
        height: "100%",
        width: "100%",
        backgroundColor:"#fff",
        border:"solid #ccc 0.1px"}}>
      <Form<LoginFormValues> onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}>
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
