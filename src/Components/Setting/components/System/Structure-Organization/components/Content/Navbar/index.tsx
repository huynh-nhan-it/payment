import React, { useEffect, useState } from "react";
import "../../../css/index.css";
import { MdOutlineGroups } from "react-icons/md";
import { Affix, Col, Input, List, Row, Tabs } from "antd";
import { getDepartments } from "../../../../../../../../Services/PaymentRequest/apiForm";
import { getDepartmentUsers } from "../../../../../../../../Services/Organizations/apiDepartmentUsers";

const NavbarDepartment = () => {
  interface User {
    fullName: string;
    email: string;
    jobTitle: string;
  }
  const [departmentData, setDepartmentData] = useState<string[]>([]);
  const [manager, setManager] = useState<User | null>(null);
  const [supervisor, setSupervisor] = useState<User[]>();
  const [employees, setEmployees] = useState<User[]>();

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

  const [nameDepartment, setNameDepartment] = useState<any | null>(null);
  const [descriptionDepartment, setDecriptionDepartment] = useState<any | null>(
    null
  );
  const [underDepartment, setUnderDepartmen] = useState<any | null>(null);
  const [contactDepartment, setContactDepartmen] = useState<any | null>(null);
  const [codeDepartment, setCodeDepartmen] = useState<any | null>(null);

  const handleDepartmentClick = async (department: any) => {
    setNameDepartment(department);

    try {
      // Gọi hàm getDepartmentUsers để lấy danh sách người dùng của phòng ban
      const data = await getDepartmentUsers(department);
      setDecriptionDepartment(data.description);
      setUnderDepartmen(data.underDepartment);
      setContactDepartmen(data.contact);
      setCodeDepartmen(data.code);
      // Điều gì đó với danh sách người dùng đã nhận được từ API
      setManager(data.manager);
      setSupervisor(data.supervisors);
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(manager);

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <Row>
      <Col span={8}>
        <div className="navbar-department">
          <div className="search-department">
            <Input placeholder="Search" />
          </div>
          <div className="scrollable-container">
            <div className="background">
              <Affix target={() => container}>
                <ul>
                  {departmentData.map((dep) => (
                    <li
                      onClick={() => handleDepartmentClick(dep)}
                      className="department-list"
                      key={dep}>
                      <a
                        className="org-department display-flex color-black"
                        href="#">
                        <span className="org-department-icon">
                          <MdOutlineGroups />
                        </span>
                        <p className="org-department-name">{dep}</p>
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
        <div style={{ paddingTop: 64 }} className="details-department">
          {nameDepartment && (
            <>
              <h2 style={{ textAlign: "left", fontSize: 40 }}>
                {nameDepartment}
              </h2>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Information" key="1">
                  <List>
                    <List.Item>
                      {
                        <tr>
                          <td className="title-details">Description</td>
                          <td className="content-details">
                            <p>{descriptionDepartment}</p>
                          </td>
                        </tr>
                      }
                    </List.Item>
                    <List.Item>
                      {
                        <tr>
                          <td className="title-details">
                            Under the department
                          </td>
                          <td className="content-details">
                            <p>{underDepartment}</p>
                          </td>
                        </tr>
                      }
                    </List.Item>
                    <List.Item>
                      {
                        <tr>
                          <td className="title-details">Contact Info</td>
                          <td className="content-details">
                            <p>{contactDepartment}</p>
                          </td>
                        </tr>
                      }
                    </List.Item>
                    <List.Item>
                      {
                        <tr>
                          <td className="title-details">Code</td>
                          <td className="content-details">
                            <p>{codeDepartment}</p>
                          </td>
                        </tr>
                      }
                    </List.Item>
                  </List>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Manager" key="2">
                  {manager && (
                    <List>
                      <List.Item>
                        <p>{manager.fullName}</p>
                        <p>{manager.email}</p>
                        <p>{manager.jobTitle}</p>
                      </List.Item>
                    </List>
                  )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Supervisor" key="3">
                  <List>
                    {supervisor?.map((user) => (
                      <List.Item>
                        <p>{user.fullName}</p>
                        <p>{user.email}</p>
                        <p>{user.jobTitle}</p>
                      </List.Item>
                    ))}
                  </List>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Employee" key="4">
                  <List>
                    {employees?.map((user) => (
                      <List.Item>
                        <p>{user.fullName}</p>
                        <p>{user.email}</p>
                        <p>{user.jobTitle}</p>
                      </List.Item>
                    ))}
                  </List>
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
