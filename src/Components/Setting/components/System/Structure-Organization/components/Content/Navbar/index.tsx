import React, { useEffect, useState } from "react";
import "../../../css/index.css";
import { MdOutlineGroups } from "react-icons/md";
import { Affix, Button, Col, Form, Input, Row, Tabs } from "antd";
import axios from "axios";
import { getDepartments } from "../../../../../../../../Services/PaymentRequest/apiForm";

const NavbarDepartment = () => {
  const [departmentData, setDepartmentData] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    
    const departmentResponse = await getDepartments();

   
    setDepartmentData(departmentResponse);
  } catch (error) {
    console.error(error);
  }
};

const [selectedDepartment, setSelectedDepartment] = useState<any | null>(null);

  const handleDepartmentClick = (department: any) => {
    setSelectedDepartment(department);
    console.log(department)
  };
  


  const [container, setContainer] = useState<HTMLDivElement | null>(null);


  return (

      <Row>
      <Col span={8}>
    <div className="navbar-department">
      <div className="search-department">
      <Input placeholder="Search" />
      </div>
      <div className="scrollable-container" >
        <div className="background">
          <Affix target={() => container}>
            <ul>
              {departmentData.map((dep) => (
                <li onClick={() => handleDepartmentClick(dep.name)}
                className="department-list"
                key={dep?.name}>
                  <a className="org-department display-flex color-black" href="#">
                    <span className="org-department-icon">
                      <MdOutlineGroups />
                    </span>
                    <p className="org-department-name">{dep?.name}</p>
                  </a>
                </li>
              ))}
            </ul>
          </Affix>
        </div>
      </div>
    </div>
    </Col>
    <Col span={16}>
      <div style={{paddingTop: 64}}>
        {selectedDepartment && (
          <>
            <h2 style={{textAlign:"left", fontSize: 40}}>{selectedDepartment}</h2>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Information" key="1">
                  {/* Hiển thị thông tin của department */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Manager" key="2">
                  {/* Hiển thị danh sách các Manager của department */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Supervisor" key="3">
                  {/* Hiển thị danh sách các Supervisor của department */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Employee" key="4">
                  {/* Hiển thị danh sách các Employee của department */}
                </Tabs.TabPane>
              </Tabs>
          </>
          )}
      </div>
    </Col>
  </Row>
);
};

export default NavbarDepartment;
