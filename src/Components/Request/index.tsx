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

import React from "react";

import PaymentAll from "./component/Payment";
const Request: React.FC = () => {
  return <PaymentAll />;
};
export default Request;
