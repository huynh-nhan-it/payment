import { Col, Row, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import ViewTable from "./components/viewTable";
import Comment from "./components/comment-content";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { reactIcon } from "../../common/type";
import { PaymentRequest } from "../../interface/IRequest";
import { formattedNumber } from "../../common/handleF";

const { Text } = Typography;
interface IViewContent {
  userId: any;
  DetailRequestId: any;
  PaymentRequest: PaymentRequest;
}

const ViewContent: React.FC<IViewContent> = ({
  userId,
  DetailRequestId,
  PaymentRequest,
}) => {
  const { requestCode } = useParams();
  const [detail, setDetail] = useState<PaymentRequest | null>(null);
  const formattedDateTimeCreateAt =
    detail?.createAt &&
    format(new Date(detail.createAt), "dd/MM/yyyy HH:mm:ss");
  
  useEffect(() => {
    setDetail(PaymentRequest);
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
    <div>
      {
        <div
          style={{
            margin: 0,
            paddingTop: 128,
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
              {detail?.currency !== "VND" &&  <Col className="col-info-request">
              </Col>}
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
            <ViewTable detailTables={detail?.tableDetailRequest}></ViewTable>
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
                  {detail?.method !== "Cash" && (
                    <div>
                                          <Row style={{ marginBottom: 16 }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <Text strong>Account</Text>
                      </Col>
                      <Col span={10} style={{ textAlign: "left" }}>
                        {" "}
                        <Text>NH TMCP NGOAI THUONG VN</Text>
                      </Col>
                      <Col span={4}></Col>
                    </Row>
                    <Row style={{ marginBottom: 16 }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <Text strong>Account Number</Text>
                      </Col>
                      <Col span={10} style={{ textAlign: "left" }}>
                        {" "}
                        <Text>0441000740036</Text>
                      </Col>
                      <Col span={4}></Col>
                    </Row>
                    <Row style={{ marginBottom: 16 }}>
                      <Col span={10} style={{ textAlign: "left" }}>
                        <Text strong>Beneficiary</Text>
                      </Col>
                      <Col span={10} style={{ textAlign: "left" }}>
                        {" "}
                        <Text>CONG TY TNHH OPUS SOLUTION</Text>
                      </Col>
                      <Col span={4}></Col>
                    </Row>
                    </div>
                    
                  )}
                </Col>
                <Col span={12} flex="auto">
                  <Row style={{ marginBottom: 16 }}>
                    <Col span={4}></Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      <Text strong>Suggested amount</Text>
                    </Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      {" "}
                      <Text>{formattedNumber(PaymentRequest.suggestedAmount)}</Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 16 }}>
                    <Col span={4}></Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      <Text strong>Tax</Text>
                    </Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      {" "}
                      <Text>{formattedNumber(PaymentRequest.tax)}</Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 16 }}>
                    <Col span={4}></Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      <Text strong>Advance amount</Text>
                    </Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      {" "}
                      <Text>{formattedNumber(PaymentRequest.advanceAmount)}</Text>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 16 }}>
                    <Col span={4}></Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      <Text strong>Total Payment Due</Text>
                    </Col>
                    <Col span={10} style={{ textAlign: "left" }}>
                      {" "}
                      <Text>{formattedNumber(PaymentRequest.totalPayment)}</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="row"></div>
            <div>
              <Text strong style={{ textAlign: "left", display: "block" }}>
                Attachment(s)
                <div style={{height: "1%"}}></div>
                {PaymentRequest?.attachmentList.map((child: any) => {
                  let nameFile = child.split('/');
                  let typeFile = nameFile[nameFile.length - 1].split('.');
                  return (<React.Fragment>
                    <br />
                    <Row justify={"start"}>
                    <div style={{width: "25%"}}>
                    <a
                      href={child}
                    >
                      <Row align={"middle"}>
                        
                      {reactIcon[typeFile[typeFile.length - 1]] === undefined ? reactIcon['undefinedFile'] : reactIcon[typeFile[typeFile.length - 1]]}
                      <div style={{width: "1%"}}></div>
                      {nameFile[nameFile.length - 1]}
                      </Row>
                    </a>
                    </div>
                    <p>{formattedDateTimeCreateAt}</p>
                    <div style={{width: "2%"}}></div>
                    <p>{PaymentRequest.userName}</p>
                    </Row>
                  </React.Fragment>)
                })}
              </Text>
            </div>
            <div className="row"></div>
            <div
              style={{  maxHeight: "10vh",}}
            >
              <Comment
                requestCode={requestCode}
                userId={userId}
                userDetailRequest={detail?.userId}
                DetailRequestId={DetailRequestId}
              ></Comment>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ViewContent;
