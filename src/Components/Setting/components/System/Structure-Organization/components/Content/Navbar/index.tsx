import React, { useEffect, useState } from "react";
import "../../../css/index.css";
import { MdOutlineGroups } from "react-icons/md";
import { Affix, Button, Col, Form, Input, List, Row, Tabs } from "antd";
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
      <div style={{paddingTop: 64}} className="details-department">
        {selectedDepartment && (
          <>
            <h2 style={{textAlign:"left", fontSize: 40}}>{selectedDepartment}</h2>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Information" key="1">
                  <List>
                    <List.Item>
                  {
                    <tr>
                      <td className="title-details">
                        Description
                      </td>
                      <td className="content-details">
                      Chức năng
a) Tham mưu và giúp Giám đốc Sở thực hiện quản lý nhà nước về công nghệ thông tin-điện tử (CNTT-ĐT).
b) Tạo môi trường pháp lý, thể chế, chính sách, điều hành phối hợp, đào tạo, hợp tác quốc tế, thúc đẩy và hỗ trợ cho CNTT-ĐT phát triển.
c) Hỗ trợ doanh nghiệp, đặc biệt là các doanh nghiệp vừa và nhỏ, tham gia đầu tư, cung cấp sản phẩm, dịch vụ, phát triển thị trường và cùng tham gia với Chính quyền thành phố trong các hoạt động xây dựng và thực hiện các chính sách phát triển CNT
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
                        OPUS Company
                      </td>
                    </tr>
                  }
                    </List.Item>
                    <List.Item>
                    {
                    <tr>
                      <td className="title-details">
                        Contact Info	
                      </td>
                      <td className="content-details">
                      - Tổ chức thực hiện các chương trình tuyên truyền, phổ biến, nâng cao nhận thức phát triển và ứng dụng CNTT-ĐT;
- Tổ chức, phối hợp với các đơn vị có liên quan (trường, viện, cơ quan quan nghiên cứu) nghiên cứu, thử nghiệm, ứng dụng các tiến bộ khoa học, công nghệ trong lĩnh vực CNTT-ĐT;
- Tham mưu Giám đốc Sở và phối hợp với các phòng ban trong các hoạt động hợp tác với các tỉnh/thành trong lĩnh vực CNTT-ĐT;
- Tham gia các hoạt động hợp tác quốc tế, phối hợp tổ chức các hội nghị hội thảo trong
                      </td>
                    </tr>
                  }
                    </List.Item>
                    <List.Item>
                    {
                    <tr>
                      <td className="title-details">
                        Code
                      </td>
                      <td className="content-details">
                        IT
                      </td>
                    </tr>
                  }
                  </List.Item>
                  </List>
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
