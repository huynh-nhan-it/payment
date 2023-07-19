import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Popconfirm, Table,InputNumber,Typography, UploadProps } from 'antd';
import { Layout, Menu, theme, DatePicker,Select, MenuProps } from 'antd';
//import moment, { Moment } from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import {Col, Row} from 'antd';
import './RequestDetails.css';

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
    LinkOutlined,
    DeleteTwoTone,
  } from '@ant-design/icons';
  import { Upload } from 'antd';
  
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
    rec_date: Dayjs;
    pay_content: string;
    amount: number;
    rec_no: string;
    cost_industry: string;
    cost_department: string;
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
            {dataIndex === 'rec_date' ? (
              <DatePicker
                
             />
            )
            :
            dataIndex === 'cost_department' ? (
              <Select
              defaultValue="Nothing selected"
              style={{ width: 200 }}
              options={[
                  { value: 'Nothing selected', label: 'Nothing selected' },
                  { value: 'Phòng Bán Hàng', label: 'Phòng Bán Hàng' },
                  { value: 'Phòng Dự Án', label: 'Phòng Dự Án' },
                  { value: '', label: 'Disabled', disabled: true },
              ]}
          /> 
            )
            : (
              inputNode
            )}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  type PaymentRequestProps = {
    onChange: (data: PaymentMethodData) => void;
  };
  
  type PaymentMethodData = {
    paymentMethod :string;
  };
  const TableRequest: React.FC<PaymentRequestProps> = ({onChange}) => {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState<Item[]>([
      {
        key: '0',
        rec_date: dayjs(),
        pay_content: '',
        amount: 0,
        rec_no: '',
        cost_industry: '',
        cost_department:'',
        note: '',
  }
    ]);
      const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodData>({paymentMethod:''});
  
    const handleDepartmentChange = (newValue: string) => {
      // Lấy giá trị mới của Department từ tham số newValue
      // Cập nhật lại chuỗi dữ liệu Item dựa trên giá trị mới của Department
      
      // Ví dụ: Tạo một bản sao của chuỗi   dữ liệu Item
      const updatedData = [...tableData];
      
      // Tìm phần tử hiện tại trong chuỗi dữ liệu Item
      const currentItem : Item | undefined = updatedData.find(item => item.key === '0');
      
      // Cập nhật giá trị của Department trong phần tử hiện tại
      if(currentItem){currentItem.cost_department = newValue;}
      else {}
      
      // Cập nhật lại chuỗi dữ liệu Item
      setTableData(updatedData);
  
    };
  
    const handleDateChange = (date: Dayjs, record: Item) => {
      const newData = tableData.map((item) => {
        if (item.key === record.key) {
          return { ...item, rec_date: date };
        }
        return item;
      });
      console.log(newData);
      setTableData(newData);
  
    };
    const [count, setCount] = useState(2);
    const [editingKey, setEditingKey] = useState('');
    
  
    const isEditing = (record: Item) => record.key === editingKey;
  
    const edit = (record: Partial<Item> & { key: React.Key }) => {
      form.setFieldsValue({ 
        rec_date: '',
        pay_content: '',
        amount: '', 
        rec_no: '', 
        cost_industry: '',
        cost_cost_department: '',
        note: '', 
        ...record });
      setEditingKey(record.key);
    };
  
    const cancel = () => {
      setEditingKey('');
    };
  
    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as Item;
        if (!(row.rec_date instanceof dayjs)) {
          row.rec_date = dayjs(row.rec_date); // Chuyển đổi thành đối tượng Moment
        }
        console.log(row);
        const newData = [...tableData];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          calculateTotalAmount();
          calculateTotal();
          setTableData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setTableData(newData);
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
        editable: true,
        render: (date: Dayjs | undefined, record: Item) => {
          const editing = isEditing(record);
          return editing ? (
          <DatePicker
            value={date !== undefined ? date : dayjs()}
            onChange={(date) => handleDateChange(dayjs(date), record)}
          />):(<span>{dayjs(date).format('YYYY-MM-DD')}</span>);
      },
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
        editable: true,
        render:(_:any, record: Item) => {
          const editing = isEditing(record);
          return editing ? (
          <Select
        defaultValue="1"
        style={{ width: 200 }}
        onChange={handleDepartmentChange}
        options={[
            { value: '1', label: 'Nothing selected' },
            { value: '2', label: 'Phòng Bán Hàng' },
            { value: '3', label: 'Phòng Dự Án' },
            { value: '', label: 'Disabled', disabled: true },
        ]}
    /> 
        ):(<span>{record.cost_department}</span>);
      },
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
        key: count.toString(),
        rec_date: dayjs(),
        pay_content: '',
        amount: 0,
        rec_no: '',
        cost_industry: '',
        cost_department: '',
        note: '',
      };
      calculateTotalAmount();
      calculateTotal();
      setTableData([...tableData, newData]);
      setCount(count + 1);
      setEditingKey(newData.key);
      form.resetFields();
  
   
      
    };
  
    const handleDelete = (key: React.Key) => {
      const newData = tableData.filter((item) => item.key !== key);
      calculateTotalAmount();
      calculateTotal();
      setTableData(newData);
  
  
    };
  
    const [totalAmount, setTotalAmount] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [total, setTotal] = useState(0);
  
    const handleTaxChange = (value: number | null) => {
      if (value !== null) {
      setTaxPercentage(value);
    }
    };
    const calculateTax = () => {
      const taxAmount = (totalAmount * taxPercentage) / 100;
      return taxAmount;
    };
    const calculateTotalAmount = () => {
      const sum = tableData.reduce((total, item) => total + item.amount, 0);
      setTotalAmount(sum);
    };
    useEffect(() => {
      calculateTotalAmount();
    }, [tableData]);
  
  
    const calculateTotal = () => {
      const taxAmount = calculateTax();
      const total = totalAmount + taxAmount;
      setTotal(total);
    };
    useEffect(() => {
      calculateTotal();
    }, [totalAmount, taxPercentage]);
    
  
    const [showBankAccountForm, setShowBankAccountForm] = useState(false);
    interface BankTransferData {
      bankName: string;
      accountNumber: string;
      beneficiary: string;
    }
    const [bankTransferData, setBankTransferData] = useState<BankTransferData>({
      bankName: '',
      accountNumber: '',
      beneficiary: '',
    });
    const handlePaymentMethodChange = (value: string) => {
          
      if (value !== 'Cash') {
        onChange({ paymentMethod: value });

      }
      if (value === 'bank_transfer') {
        setShowBankAccountForm(true);
      } else {
        setShowBankAccountForm(false);
      }
      console.log(value);

    };
    // useEffect(() => {
    //   console.log('Bank Transfer Data:', bankTransferData);
    // }, [bankTransferData]);
  
    const methodOptions = [
    { value: 'cash', label: 'Cash', payment_method: 'Cash' },
    { value: 'bank_transfer', label: 'Bank Transfer', payment_method: 'Bank Transfer' },
  ];

  return (
    <Layout hasSider>
         <Layout >

        <Content className='content-center'>
        <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
      <Form form={form} component={false}>   
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, fontWeight: 'bold'}}>
        Add an item
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={tableData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />

<Row>
      <Col span={12}><Form name='basic' labelCol={{ span: 10 }}
    wrapperCol={{ span: 100 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'500px' }}>
  <div style={{ marginBottom: '16px', fontWeight: 'bold',fontSize: '18px' }}>
    Payment Method: <Select
      defaultValue="Cash"
      style={{ width: 200 }}
      onChange={handlePaymentMethodChange}
      options={methodOptions}
  /> 
  </div>
  {showBankAccountForm && (
                  <div style={{ marginBottom: '16px', fontWeight: 'bold',fontSize: '18px' }}>
                    <Form.Item
                      name="bankName"
                      label="Bank Name"
                      rules={[{ required: true, message: 'Please enter bank name' }]}
                    >
                      <Input onChange={(e) =>
              setBankTransferData({ ...bankTransferData, bankName: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                      name="accountNumber"
                      label="Account Number"
                      rules={[{ required: true, message: 'Please enter account number' }]}
                    >
                      <Input onChange={(e) =>
              setBankTransferData({ ...bankTransferData, accountNumber: e.target.value })}/>
                    </Form.Item>
                    <Form.Item
                      name="beneficiary"
                      label="Beneficiary"
                      rules={[{ required: true, message: 'Please enter beneficiary' }]}
                    >
                      <Input onChange={(e) =>
              setBankTransferData({ ...bankTransferData, beneficiary: e.target.value })} />
                    </Form.Item>
                    {/* Thêm các trường thông tin khác của tài khoản ngân hàng */}
                  </div>
                )}
 
</Form></Col>
      <Col span={12}>     
      <Form className='form-calculate'>
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
      // parser={(value) => value ? value.replace('%', '') : ''}
    />
  </div>
  <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>
    Total Payment: <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}>{total}</span>
  </div>  
</Form>
</Col>
    </Row>
    </Form>
    </div>
    </Content>
    </Layout>
    </Layout>
);
};   

export default TableRequest;