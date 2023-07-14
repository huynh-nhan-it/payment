import React, { useState } from "react";
import HeaderEmployee from "./Header";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import { Breakpoint, Button, Col, Form, Input, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import jsonData from './api.json';
import { json } from "react-router-dom";


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
  setData: React.Dispatch<React.SetStateAction<Employee[]>>
}


const Overview: React.FC<OverviewProps> = ({ data, isEditable, setData }) => {

  const handleInputChange = (
    value: string | number,
    key: string,
    dataIndex: keyof Employee
  ) => {
    const updatedData = data.map((row) => {
      if (row.key === key) {
        // console.log(dataIndex);
        return { ...row, [dataIndex]: value };
      }
      return row;
    });
    setData(updatedData);
  };
  // console.log(data);


  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },

  //   {
  //     title: "Infor",
  //     dataIndex: "infor",
  //     key: "infor",
  //     render: (text: string, record: Employee) =>
  //       (isEditable) ? (
  //         <Form>
  //           <Form.Item>
  //             {record.isEditable ?
  //               (<Input
  //                 value={text}
  //                 onChange={(e) =>
  //                   handleInputChange(e.target.value, record.key, "infor")
  //                 }
  //               />) : (
  //                 <Input
  //                   value={text}
  //                   disabled={true}
  //                 />
  //               )}
  //           </Form.Item>
  //         </Form>
  //       ) : (
  //         text
  //       ),
  //   },
  // ];

  return (
    <div>
      {/* <Button onClick={handleSave} >Save</Button> */}
      <Form
       fields={data}>
        {data.map(
          item => (
            <Form.Item  
            colon={false}
            labelCol={{ span: 6, style: { display:"flex" } }} // Set the label column span to 8
             style={{ padding:"4px 8px", borderBottom: "solid #ccc 0.2px", marginBottom: "0px" }} key={item.key} label={item.name}>
              {isEditable ? (
                item.isEditable ?
                  (<Input
                  style={{width:"100%"}}
                    value={item.infor}
                    onChange={(e) =>
                      handleInputChange(e.target.value, item.key, "infor")
                    }
                  />) : (
                    <Input
                    style={{width:"100%"}}
                      value={item.infor}
                      disabled={true}
                    />
                  )

              ) : (
               <span style={{display:"flex", alignItems:"start"}}>{item.infor}</span> 
              )}

            </Form.Item>


          )
        )}
      </Form>
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

export default Overview;
