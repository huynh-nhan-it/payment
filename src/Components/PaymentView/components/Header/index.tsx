import { RollbackOutlined } from "@ant-design/icons";
import { Col, Row, theme } from "antd";
import { Layout } from "antd";
import {ImWindows} from 'react-icons/im';
import '../../css/index.css';
import React from "react";

const { Header } = Layout;

const ViewHeader: React.FC = () => {
  

  return (
    <Header
    style={{
      minWidth: '100%',
      background: '#ccc',
      position: 'fixed',
      zIndex: 1
    }} >

      <Row gutter={12} style={{paddingLeft: '1.5%'}}>
        <Col > <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a></Col>
        <Col>
        <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a>

        </Col>
        <Col>
        <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a>
        </Col>
        <Col>
        <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a>
        </Col>
        <Col>
        <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a>
        </Col>
        <Col>
        <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a>
        </Col>
        <Col>
        <a href="#" className="text-header"> <ImWindows style={{ marginRight: '5px' }}/> Return</a>
        </Col>
      </Row>
      
    </Header>
    
  

  );
}

export default ViewHeader;