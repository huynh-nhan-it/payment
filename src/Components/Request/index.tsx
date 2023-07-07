// import React from "react";
// import PaymentAll from "./Payment";
// import NavbarRequest from "./NavbarRequest";
// import './request.css'

// const Request = () => {
//   return (
//     <div className="wrapper">
//       <NavbarRequest />
//       <PaymentAll />
//     </div>
//   );
// };

// export default Request;

import { Layout, Input, theme } from "antd";
import React from "react";


import HeaderRequest from "./HeaderRequest";
import NavbarRequest from "./NavbarRequest";
import PaymentAll from "./component/Payment";
const { Search } = Input;
const { Content, Sider} = Layout;
const Request: React.FC = () => {
  const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <PaymentAll />
  );
};
export default Request;
