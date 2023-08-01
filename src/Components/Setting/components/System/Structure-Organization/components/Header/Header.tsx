import { RollbackOutlined } from "@ant-design/icons";
import { Col, Row, theme } from "antd";
import { Layout } from "antd";
import {ImWindows} from 'react-icons/im';
import {TiArrowBackOutline} from 'react-icons/ti';
import '../../css/index.css';
import React from "react";
import { FaPen, FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line, RiOrganizationChart } from "react-icons/ri";
import AddMemberForm from "./AddMember";

const { Header } = Layout;

const HeaderOrganize: React.FC = () => {


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
        <Col > <a href="/setting/system/department/add" className="text-header"> <FaRegPenToSquare style={{ marginRight: '5px' }}/> Add Department</a></Col>
        <Col>
        <a href="#" className="text-header"> <FaPen style={{ marginRight: '5px' }}/> Edit Department</a>

        </Col>
        <Col>
        <a href="#" className="text-header"> <RiDeleteBin6Line style={{ marginRight: '5px' }}/> Delete Department</a>
        </Col>
        <Col>
        <div className="text-header"> <FaRegPenToSquare style={{ marginRight: '5px' }}/><AddMemberForm/></div>
        </Col>
        <Col>
        <a href="#" className="text-header"> <RiOrganizationChart style={{ marginRight: '5px' }}/> View orgchart</a>
        </Col>
        <Col>
        <a href="#" className="text-header"> <TiArrowBackOutline style={{ marginRight: '5px' }}/> Return</a>
        </Col>
      </Row>
      
    </Header>
    
  

  );
}

export default HeaderOrganize;