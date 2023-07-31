import { Col, Row, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import ViewTable from "./components/viewTable";
import Comment from "./components/comment-content";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

import {PaymentRequest } from "../../interface/IRequest";
const { Text } = Typography;

interface IViewContent {
  userId: any,
  DetailRequestId: any
  PaymentRequest: PaymentRequest
}

const ViewContent: React.FC<IViewContent> = ({userId, DetailRequestId, PaymentRequest}) => {
  const { requestCode } = useParams();
  const [detail, setDetail] = useState<PaymentRequest | null>(null);
  const formattedDateTimeCreateAt = detail?.createAt && format(new Date(detail.createAt), "dd/MM/yyyy HH:mm:ss");

  useEffect(() => {
    setDetail(PaymentRequest) 
    //     const response = await request.get(endpoint).then((res) => {
    //         setAttachmentData(res.data.Data);
    //     }
    //     );
    // }
    // const getWokflowRequest = async () => {
    //     const endpoint = "/request/workflow/requestId=" + requestId;
    //     const response = await request.get(endpoint).then((res) => {
    //         setWorkflowData(res.data.Data);
    //     }
    //     );
    // }
    // getWokflowRequest();
    // getAttachmentsRequest();
    

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5005/api/DetailRequest/${requestCode}`)
  //     .then((response) => {
  //       setDetail(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [requestCode]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // console.log(detail.filter(dt=>dt.requestCode ===requestCode));
  // const paymentDetail = detail.find(
  //   (pr) => pr === requestCode
  // );

  return (
    <div>{(<div
      style={{
        margin: 0,
        paddingTop: 128,
      }}>
      <div
        style={{
          paddingLeft: 16,

          background: colorBgContainer,
        }}>
        <div className="parent-row-info">
          <Row className="child-row-info">
            <Col span={24}>
              <b>Request Code: {detail?.requestCode} </b>
            </Col>
          </Row>
          <Row className="child-row-info">
            <Col span={24}>
              <b>Created by: {detail?.userName}</b>
            </Col>
          </Row>
          <Row className="child-row-info">
            <Col span={24}>
              <b>Created at: {formattedDateTimeCreateAt}</b>
            </Col>
          </Row>
          <Row className="child-row-info">
            <Col span={24}>
              <b>Status: {detail?.status}</b>
            </Col>
          </Row>
        </div>

        <Typography.Title
          level={2}
          style={{ textAlign: "center", padding: "24px 0" }}>
          <b
            style={{
              fontSize: "30px",
              fontFamily: "initial",
              color: "#434343",
            }}>
            PAYMENT REQUEST
          </b>
        </Typography.Title>
        <Row className="row">
          <Col className="col-info-request">
            <div>
              <Text strong> Purpose</Text>
              <br />
              <Text> {detail?.purpose}</Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong> Department</Text>
              <br />
              <Text> {detail?.department}</Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong> Payment for</Text>
              <br />
              <Text>{detail?.paymentFor}</Text>
            </div>
          </Col>
        </Row>
        <Row className="row">
          <Col className="col-info-request">
            <div>
              <Text strong>Supplier</Text>
              <br />
              <Text> {detail?.supplier}</Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong>Currency</Text>
              <br />
              <Text>{detail?.currency}</Text>
            </div>
          </Col>
          {detail?.currency !== "VND" && (
            <Col className="col-info-request">
              <div>
                <Text strong>Exchange rate</Text>
                <br />
                <Text>{detail?.exchangeRate}</Text>
              </div>
            </Col>
          )}
          <Col className="col-info-request">
            <div>
              <Text strong> PO/PR number</Text>
              <br />
              <Text>{detail?.poNumber}</Text>
            </div>
          </Col>
        </Row>
        <div className="row"></div>
        <ViewTable detailTables = {detail?.tableDetailRequest}></ViewTable>
        <div className="row"></div>
        <div>
          <Row justify="space-between">
            <Col span={12}>
              <Row style={{ marginBottom: 16 }}>
                <Col span={10} style={{ textAlign: "left" }}>
                  <Text strong> Payment Method</Text>
                </Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  {" "}
                  <Text>{detail?.method}</Text>
                </Col>
                <Col span={4}></Col>
              </Row>
            </Col>
            <Col span={12} flex="auto">
              <Row style={{ marginBottom: 16 }}>
                <Col span={4}></Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  <Text strong>Suggested amount</Text>
                </Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  {" "}
                  <Text>1,000,000,000,000</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col span={4}></Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  <Text strong>Tax</Text>
                </Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  {" "}
                  <Text>0</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col span={4}></Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  <Text strong>Advance amount</Text>
                </Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  {" "}
                  <Text>0</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Col span={4}></Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  <Text strong>Total Payment Due</Text>
                </Col>
                <Col span={10} style={{ textAlign: "left" }}>
                  {" "}
                  <Text> 1,000,000,000,000</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="row"></div>
        <div>
          <Text strong style={{ textAlign: "left", display: "block" }}>
            Attachment(s)
          </Text>
        </div>
        <div className="row"></div>
        <div>
          <Comment requestCode = {requestCode} userId = {userId} DetailRequestId = {DetailRequestId}></Comment>
        </div>
      </div>
    </div>)}</div>
  );
};

export default ViewContent;
