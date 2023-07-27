import React, { useEffect } from "react";
import "./employee.css";
import { DatePicker, Form, Input, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs, { Dayjs } from "dayjs";
interface Address {
  Street: string | undefined;
  "Building / flatnumber": string | undefined;
  City: string | undefined;
  "Province / state": string | undefined;
  "Postal code": string | undefined;
  // Các trường dữ liệu khác nếu có
}

interface BankAccount {
  "Bank Name": string | undefined;
  "Branch number": string | undefined;
  "Bank brach name": string | undefined;
  "Bank account number": string | undefined;
  "Bank Account Name": string | undefined;
  // Các trường dữ liệu khác nếu có
}

interface ContactInfo {
  "Business phone": string | undefined;
  "Home phone": string | undefined;
  "Personal email": string | undefined;
  // Các trường dữ liệu khác nếu có
}

interface Data {
  Nation: string | undefined;
  Phone: string | undefined;
  "ID card number": string | undefined;
  "Date of ID Card": string | undefined;
  "Place of ID card": string | undefined;
  "Health insurance": string | undefined;
  "Starting date": string | undefined;
  "Starting date offical": string | undefined;
  "Leaving date": string | undefined;
  "Start Date Maternity Leave": string | undefined;
  Note: string | undefined;
  // Các trường dữ liệu khác nếu có
}

interface Literacy {
  "Academic level": string | undefined;
  "Specialized qualification": string | undefined;
  // Các trường dữ liệu khác nếu có
}

interface AdditionalInfor {
  Address: Address;
  "Bank account": BankAccount;
  "Contact Info": ContactInfo;
  Literacy: Literacy;
  Data: Data;
}

// interface AdditionalProps {
//   data: AdditionalInfor;
//   isEditable?: boolean;
// }

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
  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  // console.log(formItems.map((fit) => fit.value));

  // console.log(data);

  // console.log(data);
  const handleInputChange = (
    value: string | number,
    parentKey: string,
    childKey: string
    // dataIndex: keyof AdditionalInfor['children'][number]
  ) => {
    // const updatedData: MyObject = { ...data };
    // // updatedData[parentKey] = value;
    // updatedData[parentKey][childKey] = value;
    // console.log(parentKey, childKey, updatedData);
    // setData(updatedData);
    const updatedData = formItems.map((row: any)=>{
      // console.log(row.label, parentKey);
      if(row.label === parentKey){
        // console.log(row.value);
        row.value[childKey] = value
        // console.log(row.value, childKey);
        // console.log({...row});
        // return (row.value)
        return {...row}
      }
      // console.log({...row});

      // console.log(row);
      return {...row}
    })
    console.log(updatedData);
    // setData(updatedData)
    // return updatedData
  };
  // console.log(data);
  
  // console.log(data);
  // const handleInputChange = (
  //   value: string | number,
  //   parentKey: string,
  //   childKey: string,
  //   dataIndex: keyof AdditionalInfor['children'][number]
  // ) => {
  //   const updatedData = data.map((row) => {
  //     if (row.key === parentKey) {
  //       const updatedChildren = row.children.map((child) => {
  //         if (child.key === childKey) {
  //           return { ...child, [dataIndex]: value };
  //         }
  //         return child;
  //       });
  //       return { ...row, children: updatedChildren };
  //     }
  //     return row;
  //   });

  //   setData(updatedData);
  //   console.log(updatedData);
  // };
  // const columns = [

  // const renderChildren = (childrens: any) => {
  //   return (
  //     <>
  //       {childrens.map((item: any) => (
  //         <span>{item}</span>
  //       ))}
  //     </>
  //   )
  // }

  return (
    <div>
      {/* <Form> */}
      {/* {formItems.map((item: any) => {
            return (
              <div key={item.key}>
                <div style={{display:"flex"}}>{item.label}</div>
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
                              // onChange={(e, datestring) =>
                              //   handleInputChange(datestring, item.key, child.key, "infor")
                              // }
                            />
                          ) : (
                            <Input
                              style={{ width: "100%" }}
                              value={child.infor}
                              // onChange={(e) =>
                              //   handleInputChange(e.target.value, item.key, child.key, "infor")
                              // }
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
              </div>
              
            )
        })
          
        } */}

      {/* {formItems.map((item) =>
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
                <Input
                  style={{ width: "100%" }}
                  // value={item.value}
                  // onChange={(e) =>
                  //   handleInputChange(e.target.value, item.key, "infor")
                  // }
                />
              ) : (
                <span style={{ display: "flex", alignItems: "start" }}>
                </span>
              )}
            </Form.Item>
          )
        )} */}
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
      {/* </Form> */}

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
                {/* <Input
                  style={{ width: '100%' }}
                  // value=""
                  value={value as string | undefined} 
                /> */}

                {isEditable ? (
                  key === "Starting date offical" ||
                  key === "Leaving date" ||
                  key === "Start Date Maternity Leave" ? (
                    <DatePicker
                      style={{ width: "100%" }}
                      // value={value as string | undefined}
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

export default Additional;
