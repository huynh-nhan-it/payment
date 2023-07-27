import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Layout, Select, theme } from "antd";
import React, { useEffect, useState } from "react";
import './RequestDetails.css'
import { getApprover } from "../../Services/PaymentRequest/apiApprover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { setListApproveAPI } from "./Store/approveSlice";
const { Content } = Layout;

const ApproverRequest: React.FC = () => {
  interface User {
    fullName: string;
    email: string;
    jobTitle: string;
    label: string;
  }

  const [approverData, setApproverData] = useState<User[]>([]);
  const [approversList, setApproversList] = useState<any[]>([]);
  const [selectedApprovers, setSelectedApprovers] = useState<User[]>([]);
  const dispatch = useDispatch();

  const ListApproveAPI = useSelector((state: RootState)=>state.approve.ListApproveAPI);
  const jsonString = JSON.stringify(selectedApprovers);
  const [ListApprover, setListApprover] = useState<string[]>([]);
  // dispatch(setListApproveAPI(ListApprover));
  // console.log(ListApproveAPI)
  //console.log(ListApprover)
  useEffect(() => {
    // Chuyển đổi selectedApprovers thành chuỗi JSON và cập nhật ListApproveAPI
    const jsonString = JSON.stringify(selectedApprovers);
    dispatch(setListApproveAPI(jsonString));
  }, [selectedApprovers, dispatch]);

  console.log(ListApproveAPI)




  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const approverResponse: User[] = await getApprover();
      setApproverData(approverResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const addApprover = () => {
    const newApprover = {
      name: `Approver ${approversList.length + 1}`,
      role: ''
    };
    setApproversList([...approversList, newApprover]);
  };

  const handleApproverChange = (selectedOption: { value: any; label?: string; }, index: number) => {
    const updatedApprovers = [...approversList];
    updatedApprovers[index].role = selectedOption.value;
    setApproversList(updatedApprovers);

    
    const selectedApproverData = approverData.find((approver) => approver.fullName === selectedOption.value);

  // Kiểm tra nếu đã tìm thấy thông tin người duyệt, thì lưu vào mảng selectedApprovers
  if (selectedApproverData) {
    const updatedSelectedApprovers = [...selectedApprovers];
    updatedSelectedApprovers[index] = selectedApproverData;
    setSelectedApprovers(updatedSelectedApprovers);
    setListApprover([jsonString]);
    dispatch(setListApproveAPI(ListApprover))

  }
    
  };

  const deleteApprover = (index: number) => {
    const updatedApprovers = [...approversList];
    updatedApprovers.splice(index, 1);
    setApproversList(updatedApprovers);

    const updatedSelectedApprovers = [...selectedApprovers];
  updatedSelectedApprovers.splice(index, 1);
  setSelectedApprovers(updatedSelectedApprovers);
  setListApprover([jsonString]);
  dispatch(setListApproveAPI(ListApprover))



  };

  


const approversOption: { value: string; label: string }[] = approverData.map((approver) => ({
  value: approver.fullName,
  label: approver.fullName,
}));
const getOptionLabel = (option: { value: string; label: string }) => {
  // Sử dụng phương thức find để tìm người duyệt dựa vào fullName
  const selectedApprover = approverData.find((approver) => approver.fullName === option.value);

  // Hiển thị fullName, email và jobTitle của người duyệt trong ô Select
  return (
    <div>
      <p>{selectedApprover?.fullName}</p>
      <p>{selectedApprover?.email},{selectedApprover?.jobTitle}</p>
    </div>
  );
};

  

  

  return (
    <Layout hasSider>
      <Layout>
        <Content className='content-center'>
          <div className="content-left" style={{background: colorBgContainer}}>
            <p>Send to approvers</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign:'left' }}>
              {approversList.map((approver, index) => (
                <div key={index} style={{  marginRight: '10px',flex: '0 0 25%' }}>
                  <h5>{approver.name}:</h5>
                  <Select
                      value={approversOption.find((option) => option.value === approver.role)}
                      style={{ width: 200}}
                      onChange={(selectedOption) => handleApproverChange(selectedOption, index)}
                      labelInValue
                      optionLabelProp="label"
                    >
                      {/* Sử dụng map để hiển thị tùy chỉnh thông tin người duyệt */}
                      {approversOption.map((option) => (
                        <Select.Option value={option.value} key={option.value} label={option.label}>
                          {getOptionLabel(option)} {/* Hiển thị thông tin người duyệt */}
                        </Select.Option>
                      ))}
                    </Select>
                  <DeleteTwoTone style={{ fontSize: '20px' }} onClick={() => deleteApprover(index)} />
                </div>
              ))}
            </div>
            <Button type="primary" style={{ margin:'10px', display: 'flex', flexDirection: 'row', padding: 20, alignItems: 'center' }} onClick={addApprover}>+ Add Approver</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ApproverRequest;