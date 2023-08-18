import { Button, Col, Row } from "antd";
import { Layout } from "antd";
import { TiArrowBackOutline } from "react-icons/ti";
import React from "react";
import { BsFillSendFill } from "react-icons/bs";
import { MdDrafts } from "react-icons/md";
import "./RequestDetails.css";

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
      }}
    >
      <Row gutter={24} style={{ paddingLeft: "1.5%" }}>
        <Col>
          {" "}
          <Button href="/request/payment" className="text-header">
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <TiArrowBackOutline style={{ marginRight: "5px" }} /> Return
            </div>
          </Button>
        </Col>
        <Col>
          <Button href="/request/payment" className="text-header">
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdDrafts style={{ marginRight: "5px" }} /> Save Draft
            </div>
          </Button>
        </Col>
        <Col>
          <Button href="/request/payment" className="text-header">
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsFillSendFill style={{ marginRight: "5px" }} /> Submit
            </div>
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderCreateRequest;
