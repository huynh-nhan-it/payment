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
import axios from "axios";

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

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/DetaiRequest/" + requestCode)
      .then((respone) => {
        setDetailRequestId(respone.data.Id);
        setRequestId(respone.data.requestId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const showModal = (type: any) => {
    setType(type);
    setIsModalOpen(true);
  };

  const handleOk = (Reason: any, type: any) => {
    // console.log(Reason.resizableTextArea.textArea.textContent, type);
    setIsModalOpen(false);
    if (type == "Delete") {
      axios
        .delete(
          `http://localhost:5005/api/User/delete-request/?RequestId=${RequestId}`
        )
        .then((respone) => {
          if (respone.data.success) {
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
            approverId: userId,
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
          if (response.data.mess !== "NOT YOUR TURN") {
            const data = {
              userId: userId,
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
              .then((response) => {
                console.log("hahahah");
                setIsModalOpen(false);
                window.location.href = "/request/payment";
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
      <Layout>
        <HeaderRequest />
        <Content>
          <Layout>
            <Sider
              className="sider-request"
              style={{
                background: colorBgContainer,
                padding: "64px 0",
                position: "fixed",
                height: "100%",
                borderRight: "solid #ccc 0.1px",
              }}
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <NavbarRequest />
            </Sider>

            <Content
              style={{ paddingLeft: collapsed ? "0" : "200px" }}
              className="content-request"
            >
              <ViewHeader
                showModal={showModal}
                userId={userId}
                DetailRequestId={DetailRequestId}
              ></ViewHeader>
              <div>
                {requestCode && (
                  <ViewContent
                    userId={userId}
                    DetailRequestId={DetailRequestId}
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
      </Layout>
    </div>
  );
}

export default ViewPayment;
