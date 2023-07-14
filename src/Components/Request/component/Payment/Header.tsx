import React from "react";
import { Layout } from "antd";
import { FaFilter } from "react-icons/fa";
import { TbArrowBarToRight } from "react-icons/tb";
import "./payment.css";

import DropdownFilter from "./DropdownFilter";
import { Link } from "react-router-dom";
// import RequestDetailsLayout2 from "./RequestDetailsLayout2";
// import moment from 'moment';

const { Header } = Layout;

const HeaderPayment: React.FC = () => {
  return (
    <Header
      className="header-payment"
      style={{
        backgroundColor: "#F5F6FA",
        alignItems: "center",
      }}>
      <div className="payment-request">Payment Request</div>
      <div className="right-header">
        <div className="export-file padding-10 bg-header-payment color-header-payment">
          {" "}
          <TbArrowBarToRight />
          <span className="padding-left-6 padding-right-6">Export Excel</span>
        </div>
        <div className="filter padding-10 bg-header-payment color-header-payment">
          <FaFilter /> <DropdownFilter  />
        </div>

        <div className="create-new padding-10 bg-create-new color-white">
          {" "}
         <Link to={"/request/create-request"}> + Create New</Link>
        </div>
      </div>
    </Header>
  );
};

export default HeaderPayment;
