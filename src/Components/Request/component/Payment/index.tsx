import React from "react";
import Payment from "./Payment";
import HeaderPayment from "./Header";
import DropdownFilter from "./DropdownFilter";
import { Provider } from "react-redux";
import store from "./store";

const PaymentAll: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{ paddingTop: "64px" }}>
        {/* <HeaderPayment/> */}
        <Payment />
        {/* <DropdownFilter/> */}
      </div>
    </Provider>
  );
};

export default PaymentAll;
