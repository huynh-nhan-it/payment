import "./App.css";
import ApiCall from "./Components/ApiCall";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Request from "./Components/Request";
import Employee from "./Components/Employee";
import { Layout, theme, Input, Button } from "antd";
import HeaderRequest from "./Components/Request/HeaderRequest";
import { Content, Header } from "antd/es/layout/layout";
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
import Register from "./Components/Login/Register";

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
      // console.log(decoded);

      setEmail(emailAddress);
    }
  }, [email]);

  // console.log(email);

  const [collapsed, setCollapsed] = useState(false);

  // console.log(email);
  return (
    <div className="App">
      {/* <ApiCall /> */}
      {/* <ProtectedRoutes /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!email ? <Login /> : <Navigate to="/" />}
          />
           <Route
            path="/register"
            element={ <Register/>}
          />
          <Route
            path="/"
            element={email ? <ApiCall /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/"
            element={email ? <ApiCall /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!email ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={!email ? <Navigate to="/login" /> : <Navigate to="/" />}
          /> */}
        </Routes>
        {email && (
          <Routes>
            <Route path="setting" element={<Setting />}></Route>
            <Route
              path="setting/system/department"
              element={<StructureOrganization />}></Route>
            <Route
              path="request/payment/view/:requestCode"
              element={<ViewPayment></ViewPayment>}></Route>
            <Route path="request/payment" element={<Request />} />
            <Route path="setting/system/employee" element={<Employee />} />
            <Route
              path="request/payment/new"
              element={<SubmitRequest />}></Route>
          </Routes>
        )}
        {/* <Routes>
          <Route
            path="/login"
            element={!email ? <Login /> : <Navigate to="/" />}
          />
          <Route path="register" element={<RegisterForm />}></Route>
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link,
//   Navigate,
// } from "react-router-dom";

// // Giả sử isAuthenticated là biến lưu trạng thái đăng nhập của người dùng (true/false)
// const isAuthenticated = false;

// const LoginPage = () => {
//   // Trang đăng nhập
//   return <h1>Login Page</h1>;
// };

// const HomePage = () => {
//   // Trang sau khi đăng nhập thành công
//   return <h1>Home Page</h1>;
// };

// const App = () => {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/home">Home</Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route
//           path="/login"
//           element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
//         />
// <Route
//   path="/home"
//   element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
// />
//         {/* Trang mặc định sẽ điều hướng đến /login nếu chưa đăng nhập hoặc /home nếu đã đăng nhập */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
