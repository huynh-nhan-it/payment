import React, { createContext, useContext, useEffect, useState } from "react";
import "../../../css/index.css";
import { MdOutlineGroups } from "react-icons/md";
import { Affix, Col, Input, List, Row, Tabs } from "antd";
import { getDepartments } from "../../../../../../../../Services/PaymentRequest/apiForm";
import { getCheckManager, getDepartmentUsers } from "../../../../../../../../Services/Organizations/apiDepartmentUsers";
import AddMemberForm from "../../Header/AddMember";
import HeaderOrganize from "../../Header/Header";

interface DepartmentContextProps {
  departmentName: string;
  setDepartmentName: (name: string) => void;
}
export const DepartmentContext = createContext<DepartmentContextProps | undefined>(undefined);
const NavbarDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
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
  const [checkDisplay, setCheckDisplay] = useState('');
  const handleDepartmentClick = async (department: any) => {
    setNameDepartment(department);
    setDepartmentName(department);

    try {
      const check = await getCheckManager(id, department);
      if(check == true){
        setCheckDisplay('block');
        const myEdit: HTMLElement | null = document.getElementById("edit");
        if (myEdit) {
          myEdit.style.display = "block";
        }
        const myAdd: HTMLElement | null = document.getElementById("add");
        if (myAdd) {
          myAdd.style.display = "block";
        }
        const myDelete: HTMLElement | null = document.getElementById("delete");
        if (myDelete) {
          myDelete.style.display = "block";
        }
        const myView: HTMLElement | null = document.getElementById("view");
        if (myView) {
          myView.style.display = "block";
        }
        const myAddMember: HTMLElement | null = document.getElementById("addMember");
        if (myAddMember) {
          myAddMember.style.display = "block";
        }
      }
      else {
        const myEdit: HTMLElement | null = document.getElementById("edit");
        if (myEdit) {
          myEdit.style.display = "none";
        }
        const myAdd: HTMLElement | null = document.getElementById("add");
        if (myAdd) {
          myAdd.style.display = "none";
        }
        const myDelete: HTMLElement | null = document.getElementById("delete");
        if (myDelete) {
          myDelete.style.display = "none";
        }
        const myView: HTMLElement | null = document.getElementById("view");
        if (myView) {
          myView.style.display = "none";
        }
        const myAddMember: HTMLElement | null = document.getElementById("addMember");
        if (myAddMember) {
          myAddMember.style.display = "none";
        }
      }
      
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

      const myInput: HTMLInputElement | null = document.getElementById("myInputData") as HTMLInputElement;

if (myInput) {
  // Lấy giá trị của input
  myInput.value = department;

  // Dùng giá trị đã lấy được
}
    } catch (error) {
      console.error(error);
    }
    console.log(department);
  };
  console.log(manager);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const id = localStorage.getItem('id');

  
  
  return (
    <><Row>
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
                      {<tr>
                        <td className="title-details">Description</td>
                        <td className="content-details">
                          <p>{descriptionDepartment}</p>
                        </td>
                      </tr>}
                    </List.Item>
                    <List.Item>
                      {<tr>
                        <td className="title-details">
                          Under the department
                        </td>
                        <td className="content-details">
                          <p>{underDepartment}</p>
                        </td>
                      </tr>}
                    </List.Item>
                    <List.Item>
                      {<tr>
                        <td className="title-details">Contact Info</td>
                        <td className="content-details">
                          <p>{contactDepartment}</p>
                        </td>
                      </tr>}
                    </List.Item>
                    <List.Item>
                      {<tr>
                        <td className="title-details">Code</td>
                        <td className="content-details">
                          <p>{codeDepartment}</p>
                        </td>
                      </tr>}
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
    </Row><DepartmentContext.Provider value={{ departmentName, setDepartmentName }}>
        {/* Render Component C ở đây */}
        <AddMemberForm departmentName={departmentName} />
      </DepartmentContext.Provider></>
  );
};

export default NavbarDepartment;
