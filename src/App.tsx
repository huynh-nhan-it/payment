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
import RequestDetailsLayout2 from "./RequestDetailsLayout2";
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
          <HeaderRequest />
          <Content>
            <Layout >
              <Sider
                style={{
                  background: colorBgContainer,
                  top:"64px",
                  position:'fixed',
                  height:"100%",
                  borderRight:"solid #ccc 0.1px"
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
                  top:"64px"
                }}>
                <Routes>
                  <Route path="request/payment/view" element={<ViewPayment></ViewPayment>}></Route>
                  <Route path="request" element={<Request />} />
                  <Route path="system/employee" element={<Employee />} />
                  <Route path="login" element={<Login/>}></Route>
                  <Route path="register" element={<RegisterForm/>}></Route>
                  <Route
                      path="/request/create-request"
                      element={<RequestDetailsLayout2 />}></Route>
                </Routes>
              </Content>
            </Layout>
          </Content>

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
                      path="/request/create-request"
                      element={<RequestDetailsLayout2 />}></Route>
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
