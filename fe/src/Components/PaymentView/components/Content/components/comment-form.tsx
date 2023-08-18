import { Form, Row, Col, Avatar, Button, Upload, UploadProps } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";


interface feedBack {
  [key: string]: boolean;
}
interface ICommentForm {
  isFeedBack?: feedBack ;
  handleFeedback?: (index: any) => void;
  setHasFetchedData?: () => void;
  userCommentId? : string;
  index?: any;
  userId?: any;
  DetailRequestId?: any;
}

const CommentForm: React.FC<ICommentForm> = ({
  isFeedBack,
  handleFeedback,
  setHasFetchedData,
  userCommentId,
  index,
  userId, 
  DetailRequestId
}) => {
  const [form] = Form.useForm(); // Khởi tạo form
  const onFinish = (values: any) => {
    const now = new Date();
    const data = {
      userId: userId,
      detailRequestId: DetailRequestId,
      content: values["content-comment"],
      createdAt: now.toISOString(),
      parentId: userCommentId,
    };
    console.log(data);
    axios
      .post(`http://localhost:5005/api/Comment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        form.resetFields();
        setHasFetchedData?.()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // {
  //   "userId": "499dc793-6987-4377-896a-1f8dc2f17f1a",
  //   "detailRequestId": "b2bb1bf7-ec6d-4498-8595-023356e550e7",
  //   "content": "test",
  //   "createdAt": "2023-08-09T13:15:00.540Z",
  //   "parentId": "6ab2ed25-0c35-43a5-b16c-6064fe13fad8"
  // }
  const props: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Row>
        <Col md={12} sm={24} xs={24} className="comment-default">
          <Row justify="start" gutter={12}>
            <Col
              span={4}
              sm={4}
              md={2}
              xs={2}
              style={{ textAlign: "left", marginTop: "1.5%" }}
            >
              <Avatar size="large" src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=${10000}'}/>
            </Col>
            <Col
              span={18}
              sm={16}
              md={18}
              xs={18}
              style={{ textAlign: "left" }}
            >
              <Form.Item name="content-comment" rules={[{ required: true }]}>
                <TextArea
                  placeholder="Write a comment..."
                  rows={4}
                  className="form-control"
                />
              </Form.Item>
            </Col>
            <Col sm={4} md={2} xs={2}>
              {isFeedBack?.[index] ? (
                <div style={{ display: "flex" }}>
                  {" "}
                  <Button
                    type="primary"
                    className="mr-8"
                    htmlType="submit"
                    disabled={false}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    style={{backgroundColor: "#D8D9DA"}}
                    htmlType="reset"
                    disabled={false}
                    onClick={() => handleFeedback?.(index)}
                  >
                    CanCel
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  className="btn"
                  htmlType="submit"
                  disabled={false}
                >
                  Save
                </Button>
              )}
            </Col>
            <Col md={2} sm={0} xs={0}></Col>
          </Row>
        </Col>
        <Col md={24} xs={24} sm={24}>
          <div style={{ height: "1%" }}></div>
        </Col>
        <Col md={24} xs={24} sm={24}>
          <Form.Item name="files">
            <Row justify="start">
              <Col style={{ paddingLeft: "4.2%" }}>
                <div className="upload">
                <Upload {...props}>
                  <Button type="primary" icon={<LinkOutlined />} >
                    Upload
                  </Button>
                </Upload>
                </div>
              </Col>
              <Col style={{ paddingLeft: "1.5%" }}>(Maximum 20MB per file)</Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CommentForm;
