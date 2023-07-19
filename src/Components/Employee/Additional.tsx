import React from "react";
import "./employee.css";
import { DatePicker, Form, Input, Table } from "antd";
import FormItem from "antd/es/form/FormItem";

interface Employee {
  key: string;
  name: string;
  infor: string;
  isEditable: boolean;
  type: string;
}

interface AdditionalInfor {
  key: string;
  label: string;
  children: {
    key: string;
    name: string;
    infor: string | number;
    isEditable: boolean;
    type: string;
  }[]
}

interface AdditionalProps {
  data: AdditionalInfor[];
  isEditable: boolean;
  setData: React.Dispatch<React.SetStateAction<AdditionalInfor[]>>;
}

const Additional: React.FC<AdditionalProps> = ({ data, isEditable, setData }) => {
  const handleInputChange = (
    value: string | number,
    parentKey: string,
    childKey: string,
    dataIndex: keyof AdditionalInfor['children'][number]
  ) => {
    const updatedData = data.map((row) => {
      if (row.key === parentKey) {
        const updatedChildren = row.children.map((child) => {
          if (child.key === childKey) {
            return { ...child, [dataIndex]: value };
          }
          return child;
        });
        return { ...row, children: updatedChildren };
      }
      return row;
    });

    setData(updatedData);
    console.log(updatedData);
  };
  // const columns = [
    
  const renderChildren = (childrens: any) => {
    return (
      <>
        {childrens.map((item: any) => (
          <span>{item}</span>
        ))}
      </>
    )
  }

  return (
    <div>

      <Form>
        {data.map((item: any) => {
            return (
              <>
                <span>{item.label}</span>
                {
                  (item.children.map((child: any) => (
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
                  )))
                }
              </>
              
            )
        })
          
        }
        {/* {data.map((item) => (
          // <span>{item.label}</span>
          (item.children.map((child) => (
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
          )))
        ))} */}
      </Form>

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

export default Additional;
