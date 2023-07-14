import { RollbackOutlined } from "@ant-design/icons";
import { Col, Row, theme } from "antd";
import { Layout } from "antd";
import {ImWindows} from 'react-icons/im';
import {TiArrowBackOutline} from 'react-icons/ti';
import '../../css/index.css';
import React from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineFundProjectionScreen, AiOutlineShareAlt } from "react-icons/ai";

const { Header } = Layout;

const ViewHeader: React.FC = () => {

  return (
    <Header
    style={{
      minWidth: '100%',
      background: '#ccc',
      position: 'fixed',
      zIndex: 1,
      top: "64px",
      backgroundColor: "#F5F6FA"
    }} >

      <Row gutter={24} style={{paddingLeft: '1.5%'}}>
        <Col > <a href="#" className="text-header"> <TiArrowBackOutline style={{ marginRight: '5px' }}/> Return</a></Col>
        <Col>
        <a href="#" className="text-header"> <BsFiletypePdf style={{ marginRight: '5px' }}/> Download file</a>

        </Col>
        <Col>
        <a href="#" className="text-header"> <AiOutlineFundProjectionScreen style={{ marginRight: '5px' }}/> Progress</a>
        </Col>
        <Col>
        <a href="#" className="text-header"> <AiOutlineShareAlt style={{ marginRight: '5px' }}/> Share</a>
        </Col>
      </Row>
      
    </Header>
    
  

  );
}

export default ViewHeader;