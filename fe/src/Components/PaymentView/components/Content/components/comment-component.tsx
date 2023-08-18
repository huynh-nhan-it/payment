import { Avatar, Button, Col, Row, Typography } from "antd";
import React from "react";
import "../../../css/index.css";
import { format } from 'date-fns';
import {GiReturnArrow} from "react-icons/gi"
import { BsCheckCircleFill } from "react-icons/bs";
import { Comments } from "../../../interface/IComments";
const { Text } = Typography;

interface ExampleCommentProps {
  children?: [];
  form?: React.ReactNode;
  isFeedBack?: feedBack;
  handleFeedback?: (index: any) => void;
  userDetailRequest?: string;
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
  userDetailRequest,
  comment,
  index
}) => {
  const avatar = `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
  const formattedDateTime = comment?.createAt && format(new Date(comment.createAt), "dd/MM/yyyy HH:mm:ss");
    return (
    <div>
      <Row>
        <Col span={14} className="col-parent-comment">
          <Row justify="start" className="row-comment">
            <Col span={2} className="col-comment">
              <Avatar size={40} src={comment?.userModel.avatar !== "" ? comment?.userModel.avatar : avatar}></Avatar>
            </Col>
            <Col span={16} className="col-comment">
              <div className="midle-content-comment">
                <Text className="pr-8" strong>
                  {" "}
                  {comment?.userModel.fullName}
                </Text>

                <Text className="pr-8">{formattedDateTime}</Text>
                <div style={{width:"1%"}}></div>
                {comment?.userCommentId === userDetailRequest ? <BsCheckCircleFill color="#38E54D" fontSize={"20px"}></BsCheckCircleFill>: ""}
                
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
                  type="link"
                  shape="circle"
                  icon={<GiReturnArrow size={"70%"}></GiReturnArrow>}
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
          <React.Fragment key={index}><ComponentComment comment={child} userDetailRequest={userDetailRequest}></ComponentComment></React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ComponentComment;
