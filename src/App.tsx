import "./App.css";
import ApiCall from "./Components/ApiCall";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Request from "./Components/Request";
import Employee from "./Components/Employee";
import { Layout, theme, Input } from "antd";
import HeaderRequest from "./Components/Request/HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavbarRequest from "./Components/Request/NavbarRequest";
import ViewPayment from "./Components/PaymentView/ViewIndex";
import Login from "./Components/Login/Login";
import RegisterForm from "./Components/Register/Register";
import { useEffect, useState } from "react";
import Setting from "./Components/Setting";
import StructureOrganization from "./Components/Setting/components/System/Structure-Organization/components/StructureOrganization";
import FormRequest from "./Components/PaymentRequest/FormRequest";
import SubmitRequest from "./Components/PaymentRequest/SubmitRequest";
import jwt_decode from "jwt-decode";

const { Search } = Input;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const decoded: { [key: string]: string } = jwt_decode(storedToken);

      // Access the emailaddress property
      const emailAddress =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      setEmail(emailAddress);
    }
  }, []);

  // console.log(email);
  return (
    <div className="App">
      {/* <ApiCall /> */}
      {/* <ProtectedRoutes /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApiCall />} />
        </Routes>
        <Layout>
          <>
            <HeaderRequest />

            <Content>
              <Layout>
                <Sider
                  style={{
                    background: colorBgContainer,
                    padding: "64px 0",
                    position: "fixed",
                    height: "100%",
                    borderRight: "solid #ccc 0.1px",
                  }}
                  width={200}>
                  <Search
                    placeholder="input search text"
                    // onSearch={onSearch}
                    style={{
                      width: 200,
                    }}
                  />
                  <NavbarRequest />
                </Sider>
                <Content
                  style={{
                    padding: "0 12px",
                    paddingLeft: "200px",
                    top: "64px",
                  }}>
                  <Routes>
                    <Route path="setting" element={<Setting />}></Route>
                    <Route
                      path="setting/system/department"
                      element={<StructureOrganization />}></Route>
                    <Route
                      path="request/payment/view/:requestCode"
                      element={<ViewPayment></ViewPayment>}></Route>
                    <Route path="request/payment" element={<Request />} />
                    <Route
                      path="setting/system/employee"
                      element={<Employee />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<RegisterForm />}></Route>
                    <Route
                      path="PaymentRequest"
                      element={<SubmitRequest />}></Route>
                  </Routes>
                </Content>
              </Layout>
            </Content>
          </>
          <Routes>
            <Route path="/" element={<ApiCall />} />
          </Routes>
          
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
