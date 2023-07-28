import React from "react";
import "./employee.css";
import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { AdditionalInfor } from "./Interface";

interface MyObject {
  [key: string]: any;
}
interface AdditionalProps {
  data: MyObject;
  isEditable?: boolean;
  setData: React.Dispatch<React.SetStateAction<MyObject>>;
}
const Additional: React.FC<AdditionalProps> = ({
  data,
  isEditable,
  setData,
}) => {
  console.log(data);
  // const formItems = Object.entries(data).map(([key, value]) => ({
  //   label: key,
  //   value: value,
  // }));
  // const handleInputChange = (
  //   value: string | number,
  //   parentKey: string,
  //   childKey: string
  // ) => {
  //   const updatedData = formItems.map((row: any) => {
  //     if (row.label === parentKey) {
  //       row.value[childKey] = value;
  //       return { ...row };
  //     }
  //     return { ...row };
  //   });
  //   // setData(updatedData)
  //   console.log(data)
  // console.log(formItems);
  // console.log(updatedData);
  // console.log(updatedData);
  // };

  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));
  const handleInputChange = (value: string | number, label: string) => {
    const updatedData: MyObject = { ...data };

    updatedData[label] = value;

    setData(updatedData);
  };

  // console.log(formItems);
  return (
    <div>
      {/* {Object.entries(data).map(([sectionTitle, sectionData]) => (
        <div key={sectionTitle} style={{ marginBottom: 20 }}>
          <h2>{sectionTitle}</h2>
          <Form>
            {Object.entries(sectionData).map(([key, value]) => (
              <Form.Item
                label={key}
                colon={false}
                labelCol={{ span: 6, style: { display: "flex" } }}
                style={{
                  padding: "4px 8px",
                  borderBottom: "solid #ccc 0.2px",
                  marginBottom: "0px",
                }}
                key={key}>
                {isEditable ? (
                  key === "Starting date offical" ||
                  key === "Leaving date" ||
                  key === "Start Date Maternity Leave" ? (
                    <DatePicker
                      style={{ width: "100%" }}
                      disabled={true}
                      defaultValue={dayjs(value as string)}
                      // onChange={(e) =>
                      //   handleInputChange(e.target.value, item.key, "infor")
                      // }
                    />
                  ) : key === "Date of ID Card" ? (
                    <DatePicker
                      style={{ width: "100%" }}
                      defaultValue={dayjs(value as string)}
                      onChange={(e, datestring) =>
                        handleInputChange(datestring, sectionTitle, key)
                      }
                    />
                  ) : (
                    <Input
                      style={{ width: "100%" }}
                      defaultValue={value as string}
                      onChange={(e) =>
                        handleInputChange(e.target.value, sectionTitle, key)
                      }
                    />
                  )
                ) : (
                  <span style={{ display: "flex", alignItems: "start" }}>
                    {value as string | undefined}
                  </span>
                )}
              </Form.Item>
            ))}
          </Form>
        </div>
      ))} */}

      <Form>
        {formItems.map((item) =>
          item.label === "User" ||
          item.label === "$id" ||
          item.label === "Id" ||
          item.label === "UserId" ||
          item.label === "contracts" ? (
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

export default Additional;
