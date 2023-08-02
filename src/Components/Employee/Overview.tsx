import React from "react";
import "./employee.css";
import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { formatDate } from "../../Utils/formatDate";

interface MyObject {
  [key: string]: any;
}

interface OverviewProps {
  data: MyObject;
  isEditable?: boolean;
  setData: React.Dispatch<React.SetStateAction<MyObject>>;
}

const Overview: React.FC<OverviewProps> = ({ data, isEditable, setData }) => {
  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));
  const handleInputChange = (value: string | number, label: string) => {
    const updatedData: MyObject = { ...data };

    updatedData[label] = value;

    setData(updatedData);
  };

  return (
    <div>
      <Form>
        {formItems.map((item) =>
          item.label === "User" ||
          item.label === "$id" ||
          item.label === "Id" ||
          item.label === "UserId" ? (
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
                item.label === "Rank" || item.label === "EmployeeType" ? (
                  <Input
                    style={{ width: "100%" }}
                    defaultValue={item.value}
                    onChange={(e) =>
                      handleInputChange(e.target.value, item.label)
                    }
                  />
                ) : item.label === "BirthDay" ? (
                  <DatePicker
                    style={{ width: "100%" }}
                    disabled={true}
                    defaultValue={dayjs(item.value as string)}
                    // onChange={(e) =>
                    //   handleInputChange(e.target.value, item.item.label, "infor")
                    // }
                  />
                ) : (
                  <Input
                    style={{ width: "100%" }}
                    value={item.value}
                    disabled={true}
                  />
                )
              ) : (
                <span style={{ display: "flex", alignItems: "start" }}>
                  {item.label === "BirthDay"
                    ? formatDate(item.value)
                    : item.value}
                </span>
              )}
            </Form.Item>
          )
        )}
      </Form>
    </div>
  );
};

export default Overview;
