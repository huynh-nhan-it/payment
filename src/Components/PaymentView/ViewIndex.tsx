import { Layout, theme } from "antd";
import ViewHeader from "./components/Header";
import ViewContent from "./components/Content";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderRequest from "../Request/HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavbarRequest from "../Request/NavbarRequest";
import Search from "antd/es/input/Search";
import ModalStatus from "./components/ModalStatus";
import "./css/index.css";
import axios from "axios";
import Spinner from "../common/Loading";
import {PaymentRequest} from "./interface/IRequest"



function ViewPayment(userId: any) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { requestCode } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [DetailRequestId, setDetailRequestId] = useState("");
  const [RequestId, setRequestId] = useState("");
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>({} as PaymentRequest);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/DetailRequest/${requestCode}`)
      .then((respone) => {
        setDetailRequestId(respone.data.id);
        setRequestId(respone.data.requestId);
        setPaymentRequest(respone.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const showModal = (type: any) => {
    setType(type);
    setIsModalOpen(true);
  };

  const handleOk = (Reason: any, type: any) => {
    // console.log(Reason.resizableTextArea.textArea.textContent, type);
    setIsModalOpen(false);
    if (type === "Delete") {
      axios
        .delete(
          `http://localhost:5005/api/User/delete-request/?RequestId=${RequestId}`
        )
        .then((respone) => {
          if (respone.data.success) {
            setLoading(true);
            window.location.href = "/request/payment";
          }
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      
      axios
        .post(
          `http://localhost:5005/api/User/accept-or-not`,
          {
            approverId: userId.userId,
            requestId: RequestId,
            action: type,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.mess !== "NOT YOUR TURN") {
            const data = {
              userId: userId.userId,
              detailRequestId: DetailRequestId,
              content: Reason.resizableTextArea.textArea.textContent,
              createdAt: new Date(Date.now()).toISOString(),
            };
            axios
              .post(`http://localhost:5005/api/Comment`, data, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                setLoading(true);
                setIsModalOpen(false);
                window.location.reload();
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {Loading ? (<Spinner></Spinner>) : (<Layout>
        <HeaderRequest />
        <Content style={{zIndex:1}}>
          <Layout>
            <Sider
            width={226}
              className="sider-request"
              style={{
                background: colorBgContainer,
                padding: "64px 0",
                position: "fixed",
                zIndex: 2,
                height: "100vh",
                borderRight: "solid #ccc 0.1px",
              }}
              collapsible
              collapsedWidth={0}
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                className="search-request-view"
                style={{
                  width: "100%",
                }}
                size="middle"
              />
              <NavbarRequest />
            </Sider>

            <Content
              style={{ paddingLeft: collapsed ? "0" : "226px" }}
              className="content-request"
            >
              <ViewHeader
                showModal={showModal}
                userId={userId.userId}
                DetailRequestId={DetailRequestId}
              ></ViewHeader>
              <div>
                {requestCode && (
                  <ViewContent
                    userId={userId.userId}
                    DetailRequestId={DetailRequestId}
                    PaymentRequest={paymentRequest}
                  ></ViewContent>
                )}{" "}
                <ModalStatus
                  isModalOpen={isModalOpen}
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                  type={type}
                ></ModalStatus>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>)}
      
    </div>
  );
}

export default ViewPayment;
