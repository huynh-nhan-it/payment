import {
  AlipayOutlined,
  LockOutlined,
  TaobaoOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Divider, Space, Tabs, notification } from "antd";
import { useEffect, type CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../Services/User/getAccount";
import jwt_decode from "jwt-decode";
import { openNotificationWithIcon } from "../common/notify";
import { GoMail } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { BsPhone } from "react-icons/bs";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  phoneNumber: string;
}

const LoginPage: React.FC = () => {
  function isJWTToken(str: string): boolean {
    const jwtRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;
    return jwtRegex.test(str);
  }
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [Tab, setTab] = useState("Login");

  const onTabClick = (tab: any) => {
    setTab(tab);
  }
  const onFinishLogin = async (values: LoginFormValues) => {
    // ... handle login logic
    const login = async () => {
      const endpoint = `Authen/Login`;
      const response = await request.post(endpoint, values).then((res) => {
        if (res.data === "NOT FOUND YOUR ACCOUNT") {
          openNotificationWithIcon("error", api, {
            message: "Login information is incorrect",
            description: "NOT FOUND YOUR ACCOUNT",
          });
          return;
        }
        // se(res.data);
        if (isJWTToken(res.data)) {
          localStorage.setItem("authToken", res.data);
          const decoded: { [key: string]: string } = jwt_decode(res.data);
          setToken(res.data);
          // Access the emailaddress property
          const id =
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          // console.log(decoded);
          localStorage.setItem("id", id);
          localStorage.setItem("role", role);
        } else {
          openNotificationWithIcon("error", api, {
            message: "Login information is incorrect",
            description: res.data,
          });
        }
      });
    };
    login();
  };

  const onFinishRegister = async (values: RegisterFormValues) => {
    // ... handle login logic
    const register = async () => {
      const endpoint = `Authen/Register`;
      const response = await request.post(endpoint, values).then((res) => {
        if (res.data.mess === "Success") {
          openNotificationWithIcon("success", api, {
            message: "Successfully",
            description: "Successfully Registered",
          });
          form.resetFields();
          setTab("Login");
        } else {
          if (res.data.mess === "PASSWORD KO TRÙNG KHỚP") {
            openNotificationWithIcon("error", api, {
              message: "Register information is incorrect",
              description: res.data.mess,
            });
          } else {
            openNotificationWithIcon("error", api, {
              message: "Register information is incorrect",
              description: res.data,
            })
          }
        }
        // setData(res.data);
        // se(res.data);
      });
    };
    register();

    // Set the desired timeout value (in milliseconds)
  };
  useEffect(() => {
    if (token) {
      window.location.href = "/";
      navigate("/");
    }
  }, [token]);
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      {contextHolder}
      <LoginFormPage
        form={form}
        onFinish={Tab === "Login" ? onFinishLogin : onFinishRegister}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://imgtr.ee/images/2023/08/13/b4522ebf9113a3a08cbe875068b5807d.png"
        title="Tasken"
        subTitle={`Page ${Tab} Of Web Tasken`}
        submitter={{
          searchConfig: {
            submitText: Tab, // Change this to your desired text
          },
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{ color: "#CCC", fontWeight: "normal", fontSize: 14 }}
              >
                Other {Tab} methods
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: "#1677FF" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: "#FF6A10" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid #D4D8DD",
                  borderRadius: "50%",
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: "#333333" }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs centered activeKey={Tab} onTabClick={onTabClick}>
          <Tabs.TabPane key={"Login"} tab={"Login"} />
          <Tabs.TabPane key={"Register"} tab={"Register"} />
        </Tabs>
        {Tab === "Login" && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                type: "email",
                prefix: <GoMail className={"prefixIcon"} />,
              }}
              placeholder={"Email: admin or user"}
              rules={[
                {
                  required: true,
                  message: "Please enter email!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Password: ant.design"}
              rules={[
                {
                  required: true,
                  message: "Please enter password！",
                },
              ]}
            />
          </>
        )}
        {Tab === "Register" && (
            <>
            <ProFormText
              name="firstname"
              fieldProps={{
                size: "large",
                prefix: <FiUsers className={"prefixIcon"} />,
              }}
              placeholder={"Firstname: your first name"}
              rules={[
                {
                  required: true,
                  message: "Please enter firstname!",
                },
              ]}
            />
            <ProFormText
              name="lastname"
              fieldProps={{
                size: "large",
                prefix: <FiUsers className={"prefixIcon"} />,
              }}
              placeholder={"Last name: your last name"}
              rules={[
                {
                  required: true,
                  message: "Please enter lastname!",
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                type: "email",
                prefix: <GoMail className={"prefixIcon"} />,
              }}
              placeholder={"Email: admin or user"}
              rules={[
                {
                  required: true,
                  message: "Please enter email!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Password: ant.design"}
              rules={[
                {
                  required: true,
                  message: "Please enter password！",
                },
              ]}
            />
            <ProFormText.Password
              name="confirmpassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Password: ant.design"}
              rules={[
                {
                  required: true,
                  message: "Please enter confirm password！",
                },
              ]}
            />
             <ProFormText
              name="phoneNumber"
              fieldProps={{
                size: "large",
                prefix: <BsPhone className={"prefixIcon"} />,
              }}
              placeholder={"PhoneNumber: your phone number"}
              rules={[
                {
                  required: true,
                  message: "Please enter phone number！",
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
            display: "inline-flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
         {Tab === "Login" && (
           <ProFormCheckbox noStyle name="autoLogin">
           Keep me logged in
         </ProFormCheckbox>
         )}
        </div>
      </LoginFormPage>
    </div>
  );
};

export default LoginPage;
