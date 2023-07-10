import RequestDetailsLayout1 from './RequestDetailsLayout1.tsx';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Popconfirm, Table,InputNumber,Typography } from 'antd';
import { Layout, Menu, theme, DatePicker,Select } from 'antd';
import moment, { Moment } from 'moment';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteFilled,
  EditFilled,
} from '@ant-design/icons';

const {Content, Sider } = Layout;
const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));



interface Item {
  key: string;
  rec_date: Moment;
  pay_content: string;
  amount: number;
  rec_no: string;
  cost_industry: string;
  //cost_department: selection;
  note: string;
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const RequestDetailsLayout2: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([
    {
      key: '0',
      rec_date: moment(),
      pay_content: '',
      amount: '0',
      rec_no: '',
      cost_industry: '',
  //     cost_department:<Select
  //     defaultValue="1"
  //     style={{ width: 200 }}
  //     //onChange={handleChangeDeparment}
  //     options={[
  //         { value: '1', label: 'Nothing selected' },
  //         { value: '2', label: 'Phòng Bán Hàng' },
  //         { value: '3', label: 'Phòng Dự Án' },
  //         { value: '', label: 'Disabled', disabled: true },
  //     ]}
  // /> ,
     note: '',
}
  
  ]);

  const handleDateChange = (date: Moment, record: Item) => {
    const newData = data.map((item) => {
      if (item.key === record.key) {
        return { ...item, rec_date: date };
      }
      return item;
    });
    setData(newData);

  };
  const [count, setCount] = useState(2);
  const [editingKey, setEditingKey] = useState('');
  

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ pay_content: '', amount: '', rec_no: '', cost_industry: '', note: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      if (!(row.rec_date instanceof moment)) {
        row.rec_date = moment(row.rec_date); // Chuyển đổi thành đối tượng Moment
      }
      console.log(row);
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        calculateTotalAmount();
        calculateTotal();
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }    

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }


  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns = [
    {
      title: 'Inv/Rec date	',
      dataIndex: 'rec_date',
      width: '15%',
      editable: false,
      render: (recDate: Moment, record: Item) => (
        <DatePicker value={recDate} onChange={(date) => handleDateChange(date, record)} />
      ),
    },
    {
      title: 'Pay Content',
      dataIndex: 'pay_content',
      width: '15%',
      editable: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '15%',
      editable: true,
    }, 
    {
      title: 'Invoice/Rec No',
      dataIndex: 'rec_no',
      width: '15%',
      editable: true,
    },
    {
      title: 'Cost-bearing Industry',
      dataIndex: 'cost_industry',
      width: '15%',
      editable: true,
    },
    {
      title: 'Department bear the cost',
      dataIndex: 'cost_department',
      width: '15%',
      editable: false,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: '15%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Item) => {
        
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          <EditFilled style={{fontSize:'30px'}} />
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <DeleteFilled style={{fontSize:'30px'}} />
        </Popconfirm>
        </span>
        );

        
      },
      
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'amount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleAdd = () => {
    const newData: Item = {
      key: count,
      //rec_date: moment(),
      pay_content: '',
      amount: '',
      rec_no: '',
      cost_industry: '',
      note: '',
    };
    calculateTotalAmount();
    calculateTotal();
    setData([...data, newData]);
    setCount(count + 1);
    setEditingKey(newData.key);
    form.resetFields();

 
    
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    calculateTotalAmount();
    calculateTotal();
    setData(newData);


  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [total, setTotal] = useState(0);

  const handleTaxChange = (value: number) => {
    setTaxPercentage(value);
  };
  const calculateTax = () => {
    const taxAmount = (totalAmount * taxPercentage) / 100;
    return taxAmount;
  };
  const calculateTotalAmount = () => {
    const sum = data.reduce((total, item) => total + item.amount, 0);
    setTotalAmount(sum);
  };
  useEffect(() => {
    calculateTotalAmount();
  }, [data]);


  const calculateTotal = () => {
    const taxAmount = calculateTax();
    const total = totalAmount + taxAmount;
    setTotal(total);
  };
  useEffect(() => {
    calculateTotal();
  }, [totalAmount, taxPercentage]);
  

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      
      <Layout className="site-layout" style={{ marginLeft: 200 }} >
      <RequestDetailsLayout1/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
      <Form form={form} component={false}>   
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
     <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <div style={{ marginBottom: '16px', fontWeight: 'bold',fontSize: '18px' }}>
    Total Amount: <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}>{totalAmount}</span>
  </div>
  <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>Tax:
  <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}></span>
    <InputNumber
      bordered={false}
      value={taxPercentage}
      onChange={handleTaxChange}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value ? value.replace('%', '') : ''}
    />
  </div>
  <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>
    Total Payment: <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}>{total}</span>
  </div>
</Form>
      </Form> 
      </div>
    </Content>
      </Layout>
    </Layout>
  );
};

export default RequestDetailsLayout2;