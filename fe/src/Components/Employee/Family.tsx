import React from "react";
import "./employee.css";
import { DatePicker, Form, Input, Table } from "antd";

interface MyObject {
  [key: string]: any;
}
interface FamilyProps {
  data: MyObject;
  isEditable: boolean;
  setData: React.Dispatch<React.SetStateAction<MyObject>>;
}

const Family: React.FC<FamilyProps> = ({ data, isEditable, setData }) => {
  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));
  const handleInputChange = (value: string | number | null, label: string) => {
    const updatedData: MyObject = { ...data };

    updatedData[label] = value;
    console.log(value);

    setData(updatedData);
  };
  return (
    <div>
      <Form>
        {formItems.map((item) =>
          item.label === "User" ||
          item.label === "$id" ||
          item.label === "Id" ||
          item.label === "UserId" ||
          item.label === "relationships" ? (
            ""
          ) : (
            <Form.Item
              label={item.label}
              colon={false}
              labelCol={{ span: 6, style: { display: "flex" } }} // Set the label column span to 8
              style={{
                padding: "4px 8px",
                borderBottom: "solid #ccc 0.2px",
                marginBottom: "0px",
              }}
              key={item.label}>
              {isEditable ? (
                <Input
                  style={{ width: "100%" }}
                  defaultValue={item.value}
                  onChange={(e) =>
                    handleInputChange(e.target.value, item.label)
                  }
                />
              ) : (
                <span style={{ display: "flex", alignItems: "start" }}>
                  {item.value}
                </span>
              )}
            </Form.Item>
          )
        )}
      </Form>
    </div>
  );
};

export default Family;
