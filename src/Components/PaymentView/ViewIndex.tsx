import { Layout } from "antd";
import ViewHeader from "./components/Header";
import ViewContent from "./components/Content";
import ViewSider from "./components/Sider";
import React from "react";

function ViewPayment() {
  return (
    <div>
  
    
        <ViewHeader></ViewHeader>
        <div>
        <ViewContent></ViewContent>
        </div>
    
    </div>
  );
}

export default ViewPayment;
