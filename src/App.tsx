import "./App.css";
import ApiCall from "./Components/ApiCall";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Request from "./Components/Request";
import Employee from "./Components/Employee";
import { Layout, theme, Input } from "antd";
import HeaderRequest from "./Components/Request/HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavbarRequest from "./Components/Request/NavbarRequest";
import ViewPayment from "./Components/PaymentView/ViewIndex";
const { Search } = Input;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
                </Routes>
              </Content>
            </Layout>
          </Content>

        </Layout>
      </BrowserRouter>

    </div>
  );
}

export default App;
