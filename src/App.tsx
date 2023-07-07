import "./App.css";
import ApiCall from "./Components/ApiCall";
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Request from "./Components/Request";
import Employee from "./Components/Employee";

function App() {
  return (
    <div className="App">
      {/* <ApiCall /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApiCall />} />
          <Route path="request" element={<Request />} />
          <Route path="system/employee" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
