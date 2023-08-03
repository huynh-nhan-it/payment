import React from "react";
import Payment from "./Payment";
import HeaderPayment from "./Header";
import DropdownFilter from "./DropdownFilter";
import { Provider } from "react-redux";
import store from "../store/store";

const PaymentAll: React.FC = () => {
  return (
    <div style={{ paddingTop: "64px" }}>
      <Payment />
    </div>
  );
};

export default PaymentAll;
