import { Col, Row, theme } from "antd";
import { Layout } from "antd";
import React from "react";
import { Typography, Form } from "antd";
import ViewTable from "./components/viewTable";
import Comment from "./components/comment-content";

const { Text } = Typography;

const { Content } = Layout;

const ViewContent: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      style={{
        margin: 0,
      }}
    >
      <div
        style={{
          paddingLeft: 16,
          
          background: colorBgContainer,
        }}
      >
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
          style={{ textAlign: "center", padding: "24px 0" }}
        >
          <b
            style={{
              fontSize: "30px",
              fontFamily: "initial",
              color: "#434343",
            }}
          >
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
