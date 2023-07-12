import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Mã yêu cầu",
    dataIndex: "requirement",
    key: "requirement",
  },
  {
    title: "Mục đích",
    dataIndex: "purpose",
    key: "purpose",
  },
  {
    title: "Tạo bởi",
    dataIndex: "createdby",
    key: "createdby",
  },
  {
    title: "Ngày tạo",
    key: "createddate",
    dataIndex: "createddate",
  },
];
const data = [
  {
    requirement: "2023OPS-PAY-000011",
    purpose: "John Brown",
    createdby: "Bang Nguyen Minh",
    createddate: "03/07/2023",
  },
  {
    requirement: "2023OPS-PAY-000010",
    purpose: "Jim Green",
    createdby: "Bang Nguyen Minh",
    createddate: "03/07/2023",
  },
  {
    requirement: "2023OPS-PAY-000009",
    purpose: "Joe Black",
    createdby: "Bang Nguyen Minh",
    createddate: "03/07/2023",
  },
  {
    requirement: "2023OPS-PAY-000012",
    purpose: "Joe Black",
    createdby: "Bang Nguyen Minh",
    createddate: "03/07/2023",
  },
  {
    requirement: "2023OPS-PAY-0000013",
    purpose: "Joe Black",
    createdby: "Bang Nguyen Minh",
    createddate: "03/07/2023",
  },
  {
    requirement: "2023OPS-PAY-0000014",
    purpose: "Joe Black",
    createdby: "Bang Nguyen Minh",
    createddate: "03/07/2023",
  },
 
];
const Payment: React.FC = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default Payment;
