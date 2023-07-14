import { Col, Row, theme } from "antd";
import { Layout } from "antd";
import React from "react";
import { Typography, Form } from "antd";
import ViewTable from "./components/viewTable";
import Comment from "./components/comment-content";
import jsonData from "/Users/hongnguyen/Documents/Giang/opus/payment/src/Components/Request/request.json";

const { Text } = Typography;

const { Content } = Layout;
// const initialDataList: PaymentRequestList[] = jsonData.PaymentRequestList;
const PaymentRequestDetail = [
  {
    requestCode: "2023OPS-PAY-000001",
    userName: "Emily Williams",
    createAt: "2023-07-13T17:11:59.2257238",
    status: "Approving",
    purpose: "Mua chung cư",
    department: "Marketing",
    paymentFor: "Dream Home Palace",
    supplier: "1041171-Công Ty TNHH Opus Solution",
    currency: "USD",
    poNumber: 50,
    tableDetailRequest: [
      {
        id: "e0ccbf32-ee25-44df-5463-08db83899822",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello TDTU",
        amount: 30,
        invNo: 2,
        industry: "string",
        departmentOnTable: "TabCorp",
        note: "Một có Note",
      },
      {
        id: "d0cdf588-e534-48d5-5464-08db83899822",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello Opus",
        amount: 40,
        invNo: 3,
        industry: "string",
        departmentOnTable: "CotecCons",
        note: "Hai có Note",
      },
    ],
    method: "Cash",
    approverIds: [
      {
        id: "9f86a3a1-0807-4fe2-9e52-3857f473a150",
        fullName: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        jobTitle: "Scrum Master",
      },
      {
        id: "f811e1aa-5127-4635-9299-a03f4c1df306",
        fullName: "Daniel Wilson",
        email: "daniel.wilson@example.com",
        jobTitle: "Database",
      },
    ],
  },
  {
    requestCode: "2023OPS-PAY-000002",
    userName: "Emily Williams",
    createAt: "2023-07-13T17:12:38.4441154",
    status: "Approved",
    purpose: "Mua Đất",
    department: "Human Resource",
    paymentFor: "Mua đất ở Q8",
    supplier: "1041171-Công Ty TNHH Opus Solution",
    currency: "VND",
    poNumber: 10,
    tableDetailRequest: [
      {
        id: "4835a745-92f7-4649-b2d2-08db8389af7f",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello World",
        amount: 20,
        invNo: 1,
        industry: "Bất Động Sản",
        departmentOnTable: "WordPress",
        note: "Không có Note",
      },
      {
        id: "3e46c05e-bbb6-4151-b2d3-08db8389af7f",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello TDTU",
        amount: 30,
        invNo: 2,
        industry: "string",
        departmentOnTable: "TabCorp",
        note: "Một có Note",
      },
      {
        id: "e7b89d34-03a1-452c-b2d4-08db8389af7f",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello Opus",
        amount: 40,
        invNo: 3,
        industry: "string",
        departmentOnTable: "CotecCons",
        note: "Hai có Note",
      },
    ],
    method: "Cash",
    approverIds: [
      {
        id: "9f86a3a1-0807-4fe2-9e52-3857f473a150",
        fullName: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        jobTitle: "Scrum Master",
      },
      {
        id: "65636075-b136-48df-8067-6d67fdf95d8e",
        fullName: "John Doe",
        email: "john.doe@example.com",
        jobTitle: "Tester",
      },
      {
        id: "f811e1aa-5127-4635-9299-a03f4c1df306",
        fullName: "Daniel Wilson",
        email: "daniel.wilson@example.com",
        jobTitle: "Database",
      },
    ],
  },
];

const ViewContent: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
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
              <b>Request Code: 2022OPS-PAY-000012</b>
            </Col>
          </Row>
          <Row className="child-row-info">
            <Col span={24}>
              <b>Created by: Demo Nhân Viên</b>
            </Col>
          </Row>
          <Row className="child-row-info">
            <Col span={24}>
              <b>Created at: 13/07/2022 10:08</b>
            </Col>
          </Row>
          <Row className="child-row-info">
            <Col span={24}>
              <b>Status: Waiting For Approval</b>
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
              <Text> test 1307 </Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong> Department</Text>
              <br />
              <Text> IT/ Technical</Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong> Payment for</Text>
              <br />
              <Text>(FIN) Thanh toán các khoản NSNN</Text>
            </div>
          </Col>
        </Row>
        <Row className="row">
          <Col className="col-info-request">
            <div>
              <Text strong>Supplier</Text>
              <br />
              <Text> 1041171-Công Ty TNHH Opus Solution</Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong>Currency</Text>
              <br />
              <Text> VND (đ)</Text>
            </div>
          </Col>
          <Col className="col-info-request">
            <div>
              <Text strong> PO/PR number</Text>
              <br />
              <Text></Text>
            </div>
          </Col>
        </Row>
        <div className="row"></div>
        <ViewTable></ViewTable>
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
                  <Text>Cash</Text>
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
          <Comment></Comment>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
