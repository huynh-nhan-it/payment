import {UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Typography } from "antd";
import React from "react";
import { FcApproval } from "react-icons/fc";
import { IoReturnUpBack } from "react-icons/io5";
import "../../../css/index.css";
import { format } from 'date-fns';
const { Text } = Typography;

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

interface ExampleCommentProps {
  children?: Array<React.ReactNode>;
  form?: React.ReactNode;
  isFeedBack?: feedBack;
  handleFeedback?: (index: any) => void;
  comment?: Comments,
  index?: any
}

interface feedBack {
  [key: string] : boolean
}

const ComponentComment: React.FC<ExampleCommentProps> = ({
  children,
  form,
  isFeedBack,
  handleFeedback,
  comment,
  index
}) => {
  const formattedDateTime = comment?.createAt && format(new Date(comment.createAt), "dd/MM/yyyy HH:mm:ss");  return (
    <div>
      <Row>
        <Col span={14} className="col-parent-comment">
          <Row justify="start" className="row-comment">
            <Col span={2} className="col-comment">
              <Avatar size={40} src={comment?.userModel.avatar} icon={comment?.userModel.avatar !== "" ? comment?.userModel.avatar : <UserOutlined></UserOutlined>}></Avatar>
            </Col>
            <Col span={16} className="col-comment">
              <div className="midle-content-comment">
                <Text className="pr-8" strong>
                  {" "}
                  {comment?.userModel.fullName}
                </Text>

                <Text className="pr-8">{formattedDateTime}</Text>
                <FcApproval fontSize={"20px"}></FcApproval>
              </div>
              <div className="midle-content-comment">
                <span>
                  {comment?.content}
                </span>
              </div>
            </Col>
            <Col span={6} className="te-r">
              {handleFeedback ? (
                <Button
                  onClick={() => handleFeedback(index)}
                  type="dashed"
                  shape="circle"
                  icon={<IoReturnUpBack></IoReturnUpBack>}
                ></Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Col>
        <Col span={10}></Col>
      </Row>
      <div className="children-comment">
        {isFeedBack?.[index] === true ? (
          <div className="form-commnent">
            <div className="child-form-content"></div>
            {form}  
          </div>
        ) : (
          ""
        )}
        {children?.map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ComponentComment;
