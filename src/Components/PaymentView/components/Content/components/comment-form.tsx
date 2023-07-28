import { Form, Row, Col, Avatar, Button, Upload, UploadProps } from "antd";
import { UserOutlined, LinkOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

interface Comments {
  userModel: UserModel;
  createAt: string | undefined;
  content: string | undefined;
  commentReplyList: [];
}

interface UserModel {
  fullName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  avatar: string | undefined;
  jobTitle: string | undefined;
}

interface feedBack {
  [key: string]: boolean;
}
interface ICommentForm {
  isFeedBack?: feedBack;
  handleFeedback?: (index: any) => void;
  setHasFetchedData?: () => void;
  index?: any;
  userId?: any;
  DetailRequestId?: any;
}

const CommentForm: React.FC<ICommentForm> = ({
  isFeedBack,
  handleFeedback,
  setHasFetchedData,
  index,
  userId, 
  DetailRequestId
}) => {
  const onFinish = (values: any) => {
    console.log("Submitted values:", values);
    const data = {
      userId: userId,
      detailRequestId: DetailRequestId,
      content: values["content-comment"],
      createdAt: new Date(Date.now()).toISOString()
    };
    console.log(data);
    axios
      .post(`http://localhost:5005/api/Comment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const props: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  return (
    <Form onFinish={onFinish}>
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
              <Avatar size="large" icon={<UserOutlined />} />
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
                    type="dashed"
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
                <Upload {...props}>
                  <Button type="primary" icon={<LinkOutlined />} style={{}}>
                    Upload
                  </Button>
                </Upload>
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
