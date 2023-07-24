import React from "react";
import "./employee.css";
import { DatePicker, Form, Input, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
interface Address {
  Street: string;
  "Building / flatnumber": string;
  City: string;
  "Province / state": string;
  "Postal code": string;
  // Các trường dữ liệu khác nếu có
}

interface BankAccount {
  "Bank Name": string;
  "Branch number": string;
  "Bank brach name": string;
  "Bank account number ": string;
  "Bank Account Name": string;
  // Các trường dữ liệu khác nếu có
}

interface ContactInfo {
  "Business phone": string;
  "Home phone": string;
  "Personal email": string;
  // Các trường dữ liệu khác nếu có
}

interface Data {
  Nation: string;
  Phone: string;
  "ID card number": string;
  "Date of ID Card": string;
  "Place of ID card": string;
  // Các trường dữ liệu khác nếu có
}

interface Literacy {
  "Academic level": string;
  "Specialized qualification": string;
  // Các trường dữ liệu khác nếu có
}

interface AdditionalInfor{
  Address:Address;
  BankAccount:BankAccount;
  ContactInfo:ContactInfo;
  Literacy:Literacy;
  Data:Data;
}

interface MyObject {
  [key: string]: any;
}

interface Section {
  [sectionTitle: string]: AdditionalInfor;
}


interface AdditionalProps {
  data: MyObject;
  isEditable?: boolean;
}
// interface AdditionalProps {
//   data: ;
//   isEditable: boolean;
//   setData: React.Dispatch<React.SetStateAction<AdditionalInfor[]>>;
// }

const Additional: React.FC<AdditionalProps> = ({ data, isEditable }) => {
  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  console.log(formItems.map(fit => 
    fit.value
  ));

  console.log(data);

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
      <Form>
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
                <Input
                  style={{ width: "100%" }}
                  // value={item.value}
                  // onChange={(e) =>
                  //   handleInputChange(e.target.value, item.key, "infor")
                  // }
                />
              ) : (
                <span style={{ display: "flex", alignItems: "start" }}>
                  {/* {item.value} */}
                </span>
              )}
            </Form.Item>
          )
        )}
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


      {Object.entries(data).map(([sectionTitle, sectionData]) => (
        <div key={sectionTitle} style={{ marginBottom: 20 }}>
          <h2>{sectionTitle}</h2>
          <Form>
            {Object.entries(sectionData).map(([key, value]) => (
              <Form.Item
                label={key}
                colon={false}
                labelCol={{ span: 6, style: { display: 'flex' } }}
                style={{
                  padding: '4px 8px',
                  borderBottom: 'solid #ccc 0.2px',
                  marginBottom: '0px',
                }}
                key={key}
              >
                <Input
                  style={{ width: '100%' }}
                  // value=""
                  value={value} // Bind the value to the input
                  // You can add onChange event handler here if you need to update the value
                  // onChange={(e) => handleInputChange(e.target.value, key, sectionTitle)}
                />
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
