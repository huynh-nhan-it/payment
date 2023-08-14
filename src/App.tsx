import "./App.css";
import ApiCall from "./Components/ApiCall";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Request from "./Components/Request";
import Employee from "./Components/Employee";
import ViewPayment from "./Components/PaymentView/ViewIndex";
import Login from "./Components/Login/Login";
import Setting from "./Components/Setting";
import StructureOrganization from "./Components/Setting/components/System/Structure-Organization/components/StructureOrganization";
import SubmitRequest from "./Components/PaymentRequest";
import Register from "./Components/Login/Register";
import LoginPage from "./Components/Login";


function App() {
  const userId = localStorage.getItem("id");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!userId ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/"
            element={userId ? <ApiCall /> : <Navigate to="/login" />}
          />
        </Routes>
        {userId && (
          <Routes>
            <Route path="setting" element={<Setting />}></Route>
            <Route
              path="setting/system/department"
              element={<StructureOrganization  />}></Route>
            <Route
              path="request/payment/view/:requestCode"
              element={<ViewPayment userId={userId}></ViewPayment>}></Route>
            <Route path="request/payment" element={<Request />} />
            <Route path="setting/system/employee" element={<Employee />} />
            <Route
              path="request/payment/new"
              element={<SubmitRequest />}></Route>
          </Routes>
        )}

      </BrowserRouter>
    </div>
  );
}

export default App;