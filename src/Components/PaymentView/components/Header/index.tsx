import { Col, Row } from "antd";
import { Layout } from "antd";
import { TiArrowBackOutline, TiDeleteOutline } from "react-icons/ti";
import "../../css/index.css";
import React, { useEffect, useState } from "react";
import { BsFiletypePdf } from "react-icons/bs";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { FiCheck } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const { Header } = Layout;

interface IHeader {
  showModal: (type: any) => void;
  userId: any;
  DetailRequestId: any;
}

const ViewHeader: React.FC<IHeader> = ({
  showModal,
  userId,
  DetailRequestId,
}) => {
  const [checkApprove, setCheckApprove] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/api/User/check-my-turn?ApproverId=${userId}&DetailRequestId=${DetailRequestId}`
      )
      .then((respone) => {
        setCheckApprove(respone.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const role = localStorage.getItem("role");
  console.log(role);
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
          <a href="/request/payment" className="text-header">
            {" "}
            <TiArrowBackOutline style={{ marginRight: "5px" }} /> Return
          </a>
        </Col>
        <Col>
          <a href="#" className="text-header">
            {" "}
            <BsFiletypePdf style={{ marginRight: "5px" }} /> Download file
          </a>
        </Col>
        {role && <Col>
          <a
            href="#"
            className="text-header"
            onClick={() => {
              showModal("Delete");
            }}
          >
            {" "}
            <MdDeleteOutline style={{ marginRight: "5px" }} /> Delete
          </a>
        </Col>}
        <Col>
          <a href="#" className="text-header">
            {" "}
            <AiOutlineFundProjectionScreen
              style={{ marginRight: "5px" }}
            />{" "}
            Progress
          </a>
        </Col>
        { checkApprove &&
        (
          <>
            <Col>
              <a
                href="#"
                className="text-header"
                onClick={() => showModal("Approved")}
              >
                <FiCheck style={{ marginRight: "5px" }} /> Approve
              </a>
            </Col>
            <Col>
              <a
                href="#"
                className="text-header"
                onClick={() => showModal("Rejected")}
              >
                <TiDeleteOutline style={{ marginRight: "5px" }} /> Reject
              </a>
            </Col>
          </>
        )}
        <Col>
          <a href="#" className="text-header">
            {" "}
            <AiOutlineShareAlt style={{ marginRight: "5px" }} /> Share
          </a>
        </Col>
      </Row>
    </Header>
  );
};

export default ViewHeader;
