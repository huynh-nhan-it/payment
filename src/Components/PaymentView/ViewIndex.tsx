import { Layout } from "antd";
import ViewHeader from "./components/Header";
import ViewContent from "./components/Content";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
function ViewPayment() {
  const { requestCode } = useParams();
  return (
    <div>
      <ViewHeader></ViewHeader>
      <div>
        {requestCode && (
          <ViewContent/>
        )}
      </div>
    </div>
  );
}

export default ViewPayment;
