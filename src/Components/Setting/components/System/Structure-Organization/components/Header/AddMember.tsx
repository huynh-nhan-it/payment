import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getDepartments } from "../../../../../../../Services/PaymentRequest/apiForm";
import { getApprover } from "../../../../../../../Services/PaymentRequest/apiApprover";
import { Button, Dropdown, Form, Input, Menu, Select, Space } from "antd";
import { SelectError } from "../../../../../../PaymentRequest/showError";
import { DepartmentContext } from "../Content/Navbar";

interface Member{
  fullName: string;
  email: string;
  jobTitle: string;
}

const AddMemberForm: React.FC <{departmentName: string | undefined }> = ({ departmentName }) => {
    const [departmentData, setDepartmentData] = useState<string[]>([]);
    const [memberData, setMemberData] = useState<Member[]>([]);
    const context = useContext(DepartmentContext);
    const fetchData = async () => {
      try {
        const memberResponse = await getApprover();  
        const departmentResponse = await getDepartments();
        setMemberData(memberResponse);
        setDepartmentData(departmentResponse);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchData();
  
    }, []);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [position, setPosition] = useState("");
  const [member, setMember] = useState<Member | null>(null);

  
  
  

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  
  

  

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if( position==""||member==null)
    {
      SelectError();
    }
    else if (member) {
      const data = {
        fullName: member.fullName,
        email: member.email,
        jobTitle: member.jobTitle,
      };
    

    axios
      .post(`http://localhost:5005/api/Department/add-member?DepartmentName=${departmentName}&Position=${position}`, data)
      .then((response) => {
        console.log("Response from API:", response.data);
        // Xử lý dữ liệu trả về nếu cần thiết
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };
  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation
  };

  const handleMemberChange = (selectedOption:string | null) => {
    if (selectedOption) {
      const selectedMember = memberData.find((member) => member.fullName === selectedOption);
      if (selectedMember) {
        setMember(selectedMember);
        console.log(selectedMember);
       
      }
    } else {
      setMember(null);
    }
    
  };

  // const handleDepartmentChange = (value: string) =>{
  //   setDepartmentName(value);
  //   console.log(value);
  // }

  const handlePositionChange = (value: string) =>{
    setPosition(value);
    console.log(value);
  }
  const membersOption: { value: string; label: string }[] = memberData.map((member) => ({
    value: member.fullName,
    label: member.fullName,
  }));
  const getOptionLabel = (option: { value: string; label: string }) => {
    // Sử dụng phương thức find để tìm người duyệt dựa vào fullName
    const selectedApprover = memberData.find((member) => member.fullName === option.value);
  
    // Hiển thị fullName, email và jobTitle của người duyệt trong ô Select
    return (
      <div>
        <p>{selectedApprover?.fullName}</p>
        <p>{selectedApprover?.email},{selectedApprover?.jobTitle}</p>
      </div>
    );
  };

  
  console.log("Department Name from Context:", context?.departmentName);



  const menu = (
    <Menu style={{ right: "-26px", top: "10px" }}>
      <Menu.Item key="form">
        <Form
          onClick={handleFormClick}
          style={{ width: 320 }}
          className="padding-bottom-12">
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" ghost onClick={handleSubmit}>
              Add Member
            </Button>
          </Form.Item>
          <Form.Item label="Select Member" style={{fontWeight: "bold", display: "flex", justifyContent: "flex-end" }}>
            <Select
              showSearch
              style={{ width: 200}}
              key="member"
              onChange={handleMemberChange}
              value={member ? member.fullName : undefined}
            >
            {membersOption.map((option) => (
                        <Select.Option value={option.value} key={option.value} label={option.label}>
                          {getOptionLabel(option)} {/* Hiển thị thông tin người duyệt */}
                        </Select.Option>
                        ))}
            </Select>
          </Form.Item>
          <Form.Item label="Department" style={{fontWeight: "bold", display: "flex", justifyContent: "flex-end" }}>
            <Input style={{width:200}} id="departmentAdd" value={departmentName || 'check'}  disabled/>
            {/* <Select
              showSearch
              style={{ width: 200}}
              key="department"
              onChange={handleDepartmentChange}        
              value={departmentName}>
            {departmentData.map((departmentName) => (
                        <option key={departmentName} value={departmentName}>                         
                          {departmentName}
                        </option>
                        ))}
                                                          
            </Select> */}

          </Form.Item>
          <Form.Item label="Position" style={{fontWeight: "bold", display: "flex", justifyContent: "flex-end" }}>
            <Select
              showSearch
              style={{ width: 200}}
              key="position"
              onChange={handlePositionChange} 
              value={position}
              >       
              
                        <option value={"Employee"}>Employee</option>
                <option value={"Supervisor"}>Supervisor</option>      
            </Select>
          </Form.Item>
        </Form>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a style={{ color: "#8894A1" }} onClick={toggleFormVisibility}>
        <Space>Add Member</Space>
        {" "}
      </a>
    </Dropdown>
  );
};

export default AddMemberForm;
