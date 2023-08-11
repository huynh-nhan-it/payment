import { Layout, notification, theme } from "antd";
import ViewHeader from "./components/Header";
import ViewContent from "./components/Content";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderRequest from "../Request/HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavbarRequest from "../Request/NavbarRequest";
import Search from "antd/es/input/Search";
import ModalStatus from "./components/Modal/ModalStatus";
import "./css/index.css";
import axios from "axios";
import Spinner from "../common/Loading";
import { PaymentRequest } from "./interface/IRequest";
import ModalShare from "./components/Modal/ModalShare";
import ModalProgress from "./components/Modal/ModalProgress";
import { openNotificationWithIcon } from "./common/notify";

function ViewPayment(userId: any) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { requestCode } = useParams();
  const [type, setType] = useState("");
  const [Loading, setLoading] = useState(true);
  const [RequestId, setRequestId] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DetailRequestId, setDetailRequestId] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isModalOpenShare, setIsModalOpenShare] = useState(false);
  const [isModalOpenProgress, setIsModalOpenProgress] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>(
    {} as PaymentRequest
  );

  useEffect(() => {
    if(!hasFetchedData) {
      axios
      .get(`http://localhost:5005/api/DetailRequest/${requestCode}`)
      .then((respone) => {
        setDetailRequestId(respone.data.id);
        setRequestId(respone.data.requestId);
        setPaymentRequest(respone.data);
        setHasFetchedData(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFetchedData]);
  //Handle modal delete, reject and approve
  const showModal = (type: any) => {
    setType(type);
    setIsModalOpen(true);
  };

  const handleOk = (Reason: any, type: any) => {
    // console.log(Reason.resizableTextArea.textArea.textContent, type);
    const name = localStorage.getItem('name');
    setIsModalOpen(false);
    if (type === "Delete") {
      axios
        .delete(
          `http://localhost:5005/api/User/delete-request/?RequestId=${RequestId}`
        )
        .then((respone) => {
          if (respone.data.success) {
            setLoading(true);
            openNotificationWithIcon('success', api, {
              message: type + ' successfully',
              description:
                'Your ' + type + ' has been updated',
            });
            setTimeout(() => {
              window.location.href = "/request/payment";
            }, 3000);
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
            requestId: DetailRequestId,
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
              content:
                type +
                ` by ${name} - Note: ` +
                Reason.resizableTextArea.textArea.textContent,
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
                setHasFetchedData(false);
                openNotificationWithIcon('success', api, {
                  message: type + ' successfully',
                  description:
                    'Your ' + type + ' has been updated',
                });
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


  //Handle modal share
  const showModalShare = () => {
    setIsModalOpenShare(true);
  };

  const processData = async (value: any) => {
    const ReceiverList = [];
    console.log(value);
    for (let i = 0; i < value.length; i++) {
      const attApprover = value[i].toString().split(' - ');
      ReceiverList.push({
        fullName: attApprover[1],
        email: attApprover[0],
        jobTitle: attApprover[2],
      });
    }
  
    return ReceiverList;
  };

  const handleOkShare = async (value: any) => {

    if (value.length > 0) {
      const ReceiverList = await processData(value);
      const data = [
        ...ReceiverList,
      ];
      axios
        .post(
          `http://localhost:5005/api/PaymentRequest/shared-request?SenderId=${userId.userId}&RequestCode=${requestCode}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((respone) => {
          setLoading(true);
          setHasFetchedData(false);
          setIsModalOpenShare(false);
          openNotificationWithIcon('success', api, {
            message: 'Share successfully',
            description:
              'Your share has been updated',
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setIsModalOpenShare(false);
  };

  const handleCancelShare = () => {
    setIsModalOpenShare(false);
  };

  //Handle modal Progress
  const showModalProgress = () => {
    setIsModalOpenProgress(true);
  };

  
  const handleCancelProgress = () => {
    setIsModalOpenProgress(false);
  };
  return (
    <div>
      {contextHolder}
      {Loading ? (
        <Spinner></Spinner>
      ) : (
        <Layout>
          <HeaderRequest />
          <Content style={{ zIndex: 1 }}>
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
                  showModalShare={showModalShare}
                  showModalProgress={showModalProgress}
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
                  <ModalShare
                    userId={userId.userId}
                    isModalOpenShare={isModalOpenShare}
                    handleOkShare={handleOkShare}
                    handleCancelShare={handleCancelShare}
                  ></ModalShare>
                  <ModalProgress  isModalOpenProgress={isModalOpenProgress}
                    handleCancelProgress={handleCancelProgress}
                    DetailRequestId={DetailRequestId} ></ModalProgress>
                </div>
              </Content>
            </Layout>
          </Content>
        </Layout>
      )}
    </div>
  );
}

export default ViewPayment;
