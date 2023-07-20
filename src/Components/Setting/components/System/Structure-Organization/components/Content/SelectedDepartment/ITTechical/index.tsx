// selectedDepartment.tsx
import React from "react";
import { Tabs } from "antd";

type SelectedDepartmentProps = {
  selectedDepartment: any;
};

const SelectedDepartment: React.FC<SelectedDepartmentProps> = ({ selectedDepartment }) => {
  return (
    <div>
      <h2 >{selectedDepartment?.name}</h2>
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
    </div>
  );
};

export default SelectedDepartment;