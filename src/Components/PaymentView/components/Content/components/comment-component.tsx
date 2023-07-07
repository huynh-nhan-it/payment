import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Typography } from "antd";
import React from "react";
import {FcApproval} from 'react-icons/fc';
import {IoReturnUpBack} from 'react-icons/io5';
import '../../../css/index.css';
const { Text } = Typography;

interface ExampleCommentProps {
  children?: Array<React.ReactNode>;
  form?: React.ReactNode;
  isFeedBack?: React.ReactNode;
  handleFeedback?: () => void
}

const ComponentComment: React.FC<ExampleCommentProps> = ({ children, form, isFeedBack, handleFeedback}) => {

  

  return  (
  
    <div>
      <Row>
        <Col span={14} className="col-parent-comment">
          <Row justify='start' className="row-comment">
            <Col span={2} className="col-comment">
              <Avatar size={40} icon={<UserOutlined></UserOutlined>}></Avatar>
            </Col>
            <Col span={16} className="col-comment">
              <div className="midle-content-comment"><Text className="pr-8" strong> Bang Nguyen Minh</Text>
  
                <Text className="pr-8">03/07/2023 13:59</Text>
                <FcApproval fontSize={'20px'}></FcApproval>
                </div>
              <div className="midle-content-comment"><span>Request <ins>2023OPS-PAY-000011</ins> has been approved</span></div>
              <div className="midle-content-comment">Note: .</div>
            </Col>
            <Col span={6} className="te-r">
              {handleFeedback ? <Button
              onClick={handleFeedback}
                type="dashed"
                shape="circle"
                icon={<IoReturnUpBack></IoReturnUpBack>}
              ></Button> : ''}
            </Col>
          </Row>
        </Col>
        <Col span={10}></Col>
      </Row>
        <div className="children-comment">
          {isFeedBack ? <div className="form-commnent">
            <div className="child-form-content"></div>
            {form}
          </div> : ''}
          {children?.map((child, index) => (
  <React.Fragment key={index}>
    {child}
  </React.Fragment>
))}
        </div>
    </div>
  );
}

export default ComponentComment;
