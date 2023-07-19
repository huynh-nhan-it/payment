import { Col, Row } from "antd";
import { Layout } from "antd";
import { TiArrowBackOutline } from "react-icons/ti";
import React from "react";
import { BsFillSendFill } from "react-icons/bs";
import { MdDrafts } from "react-icons/md";

const { Header } = Layout;

const HeaderCreateRequest: React.FC = () => {
  return (
    <Header
      style={{
        minWidth: "100%",
        background: "#ccc",
        position: "fixed",
        zIndex: 1,
        top: "64px",
        backgroundColor: "#F5F6FA",
      }}>
      <Row gutter={24} style={{ paddingLeft: "1.5%" }}>
        <Col>
          {" "}
          <a href="/request/payment" className="text-header">
            {" "}
            <TiArrowBackOutline style={{ marginRight: "5px" }} /> Return
          </a>
        </Col>
        <Col>
          <a href="#" className="text-header">
            {" "}
            <MdDrafts style={{ marginRight: "5px" }} /> Save Draft
          </a>
        </Col>
        <Col>
          <a href="#" className="text-header">
            {" "}
            <BsFillSendFill style={{ marginRight: "5px" }} /> Submit
          </a>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderCreateRequest;
