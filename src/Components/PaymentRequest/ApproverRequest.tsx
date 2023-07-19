import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Select } from "antd";
import React from "react";
import { useState } from "react";
import './RequestDetails.css'

const ApproverRequest: React.FC = () => {
    const [approvers, setApprovers] = useState([{ name: 'Approver 1', role: '' }]);

  const addApprover = () => {
    const newApprover = {
      name: `Approver ${approvers.length + 1}`,
      role: ''
    };
    setApprovers([...approvers, newApprover]);
  };

  const handleApproverChange = (selectedOption: { value: any; label?: string; }, index: number) => {
    const updatedApprovers = [...approvers];
    updatedApprovers[index].role = selectedOption.value;
    setApprovers(updatedApprovers);
  };

  const deleteApprover = (index: number) => {
    const updatedApprovers = [...approvers];
    updatedApprovers.splice(index, 1);
    setApprovers(updatedApprovers);
  };

  const approversOption = [
    { value: '1 ', label: 'Approver 1'},
    { value: '2', label: 'Approver 2'},
  ];

  return(
    <div className="content-left">
      <p>Send to approvers</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', textAlign:'left' }}>
        {approvers.map((approver, index) => (
          <div key={index} style={{  marginRight: '10px',flex: '0 0 25%' }}>
            <h5>{approver.name}:</h5>
            <Select
      value={approversOption.find((option) => option.value === approver.role)}
      style={{ width: 200 }}
      onChange={(selectedOption) => handleApproverChange(selectedOption, index)}
      options={approversOption}
  /> 
            <DeleteTwoTone style={{fontSize:'20px'}} onClick={() => deleteApprover(index)} />
          </div>
        ))}
      </div >
      <Button type = "primary"style={{ margin:'10px', display: 'flex', flexDirection: 'row', padding: 20, alignItems: 'center' }} onClick={addApprover}>+ Add Approver</Button>
    </div>
  );
};
export default ApproverRequest;