import { Layout } from "antd";
import ViewHeader from "./components/Header";
import ViewContent from "./components/Content";
import ViewSider from "./components/Sider";
import React from "react";

function ViewPayment() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
        <ViewSider></ViewSider>
      <Layout>
        <ViewHeader></ViewHeader>
        <ViewContent></ViewContent>
      </Layout>
    </Layout>
  );
}

export default ViewPayment;
