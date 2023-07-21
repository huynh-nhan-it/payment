import "./App.css";
import ApiCall from "./Components/ApiCall";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
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
import RequestDetailsLayout2 from "./Components/Request/component/CreateRequest/RequestDetailsLayout2";
import { useState } from "react";
import Setting from "./Components/Setting";
import StructureOrganization from "./Components/Setting/components/System/Structure-Organization/components/StructureOrganization";
import FormRequest from "./Components/PaymentRequest/FormRequest";
import SubmitRequest from "./Components/PaymentRequest/SubmitRequest";
const { Search } = Input;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [user, setUser] = useState({
    username: "username",
    password: "123456",
  });
  return (
    <div className="App">
      {/* <ApiCall /> */}
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
                    <Route path="setting/system/department" element={<StructureOrganization />}></Route>
                    <Route
                      path="request/payment/view/:requestCode"
                      element={<ViewPayment></ViewPayment>}></Route>
                    <Route path="request/payment" element={<Request />} />
                    <Route path="setting/system/employee" element={<Employee />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<RegisterForm />}></Route>
                    <Route
                      path="PaymentRequest"
                      element={<SubmitRequest/>}></Route>
                  </Routes>
                </Content>
              </Layout>
            </Content>
          </>
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
