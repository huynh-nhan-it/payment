import { Button, Col, Row } from "antd";
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
  showModalShare: () => void;
  showModalProgress: () => void;
  exportPDF: () => void;
  userId: any;
  DetailRequestId: any;
}

const ViewHeader: React.FC<IHeader> = ({
  showModal,
  showModalShare,
  showModalProgress,
  exportPDF,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const role = localStorage.getItem("role");
  return (
    <Header
      style={{
        minWidth: "100%",
        background: "#ccc",
        position: "fixed",
        zIndex: 1,
        // height: 125px,
        top: "64px",
        backgroundColor: "#F5F6FA",
      }}
      className="header-view"
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
          <Button
            href="#"
            // onClick={() => {
            //   exportPDF();
            // }}
            className="text-header"
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsFiletypePdf style={{ marginRight: "5px" }} /> Download file{" "}
            </div>
          </Button>
        </Col>
        {role && (
          <Col>
            <Button
              href="#"
              className="text-header"
              onClick={() => {
                showModal("Delete");
              }}
            >
              {" "}
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdDeleteOutline style={{ marginRight: "5px" }} /> Delete{" "}
              </div>
            </Button>
          </Col>
        )}
        <Col>
          <Button
            href="#"
            className="text-header"
            onClick={() => {
              showModalProgress();
            }}
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineFundProjectionScreen style={{ marginRight: "5px" }} />{" "}
              Progress{" "}
            </div>
          </Button>
        </Col>
        {checkApprove && (
          <>
            <Col>
              <Button
                href="#"
                className="text-header"
                onClick={() => showModal("Approved")}
              >
                {" "}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FiCheck style={{ marginRight: "5px" }} /> Approve
                </div>
              </Button>
            </Col>
            <Col>
              <Button
                href="#"
                className="text-header"
                onClick={() => showModal("Rejected")}
              >
                {" "}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TiDeleteOutline style={{ marginRight: "5px" }} /> Reject
                </div>
              </Button>
            </Col>
          </>
        )}
        <Col>
          <Button
            href="#"
            className="text-header"
            onClick={() => {
              showModalShare();
            }}
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineShareAlt style={{ marginRight: "5px" }} /> Share
            </div>
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default ViewHeader;
