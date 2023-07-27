import React from "react";
import "./employee.css";
import { DatePicker, Form, Input, Table } from "antd";

interface Employee {
  key: string;
  name: string;
  infor: string;
  isEditable: boolean;
  type: string;
}
interface OverviewProps {
  data: Employee[];
  isEditable?: boolean;
  setData: React.Dispatch<React.SetStateAction<Employee[]>>;
}
interface FamilyInfor {
  key: string;
  label: string;
  children: {
    key: string;
    name: string;
    infor: string | number;
    isEditable: boolean;
    type: string;
  }[];
}

interface FamilyInformation {
  MartialStatus: {
    MartialStatus: string | undefined;
  };
  EmergencyContact: {
    ContactName: string | undefined;
    Relationship: string | undefined;
    Phone: string | undefined;
  };
  PermanentAddress: {
    Street: string | undefined;
    BuildingOrFlatnumber: string | undefined;
    City: string | undefined;
    ProvinceState: string | undefined;
    PostalCode: string | undefined;
    Country: string | undefined;
  };
}
interface MyObject {
  [key: string]: any;
}
interface FamilyProps {
  data: MyObject;
  isEditable: boolean;
  setData: React.Dispatch<React.SetStateAction<MyObject>>;
}

const Family: React.FC<FamilyProps> = ({ data, isEditable, setData }) => {
  console.log(data);

  const handleInputChange = (
    value: string | number,
    parentKey: string,
    childKey: string
    // dataIndex: keyof AdditionalInfor['children'][number]
  ) => {
    const updatedData: MyObject = { ...data };
    // updatedData[parentKey] = value;
    updatedData[parentKey][childKey] = value;
    setData(updatedData);
  };
  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  // const handleInputChange = (
  //   value: string | number,
  //   parentKey: string,
  //   childKey: string,
  //   dataIndex: keyof FamilyInformation
  // ) => {
  //   const updatedData = formItems.map((row) => {
  //     if (row.label === parentKey) {
  //       const updatedChildren = Object.entries(row).map(([key, value]) => {
  //         if (key === childKey) {
  //           console.log(key);
  //           // return { ...child, [dataIndex]: value };
  //         }
  //         // return child;
  //       });
  //       // return { ...row, children: updatedChildren };
  //     }
  //     // return row;
  //   });

  //   // setData(updatedData);
  //   console.log();
  // };
  return (
    <div>
      {/* <Form>
        {data.map((item: any) => {
          return (
            <div key={item.key}>
              <div style={{ display: "flex" }}>{item.label}</div>
              {item.children.map((child: any) => (
                <Form.Item
                  colon={false}
                  labelCol={{ span: 6, style: { display: "flex" } }}
                  style={{
                    padding: "4px 8px",
                    borderBottom: "solid #ccc 0.2px",
                    marginBottom: "0px",
                  }}
                  key={child.key}
                  label={child.name}>
                  {isEditable ? (
                    child.isEditable ? (
                      child.type === "date" ? (
                        <DatePicker
                          style={{ width: "100%" }}
                          onChange={(e, datestring) =>
                            handleInputChange(
                              datestring,
                              item.key,
                              child.key,
                              "infor"
                            )
                          }
                        />
                      ) : (
                        <Input
                          style={{ width: "100%" }}
                          value={child.infor}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              item.key,
                              child.key,
                              "infor"
                            )
                          }
                        />
                      )
                    ) : (
                      <Input
                        style={{ width: "100%" }}
                        value={child.infor}
                        disabled={true}
                      />
                    )
                  ) : (
                    <span style={{ display: "flex", alignItems: "start" }}>
                      {child.infor}
                    </span>
                  )}
                </Form.Item>
              ))}
            </div>
          );
        })}
      </Form> */}

      {Object.entries(data).map(([sectionTitle, sectionData]) => (
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
                  <Input
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleInputChange(e.target.value, sectionTitle, key)
                    }
                  />
                ) : (
                  <span style={{ display: "flex", alignItems: "start" }}>
                    {/* {item.value} */}
                    {value as string | undefined}
                  </span>
                )}
              </Form.Item>
            ))}
          </Form>
        </div>
      ))}
      {/* {data.map((item) =>
  item.children.map((child) => (
    <Form.Item
      colon={false}
      labelCol={{ span: 6, style: { display: "flex" } }}
      style={{
        padding: "4px 8px",
        borderBottom: "solid #ccc 0.2px",
        marginBottom: "0px",
      }}
      key={child.key}
      label={child.name}
    >
      {isEditable ? (
        child.isEditable ? (
          child.type === "date" ? (
            <DatePicker
              style={{ width: "100%" }}
              onChange={(e, datestring) =>
                handleInputChange(datestring, item.key, child.key, "infor")
              }
            />
          ) : (
            <Input
              style={{ width: "100%" }}
              value={child.infor}
              onChange={(e) =>
                handleInputChange(e.target.value, item.key, child.key, "infor")
              }
            />
          )
        ) : (
          <Input
            style={{ width: "100%" }}
            value={child.infor}
            disabled={true}
          />
        )
      ) : (
        <span style={{ display: "flex", alignItems: "start" }}>
          {child.infor}
        </span>
      )}
    </Form.Item>
  ))
)} */}

      {/* <Button onClick={handleSave} >Save</Button> */}
      {/* <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
        showHeader={false}
      />{" "} */}
    </div>
  );
};

export default Family;
