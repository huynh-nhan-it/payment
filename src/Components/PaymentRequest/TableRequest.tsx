import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Popconfirm, Table,InputNumber,Typography, UploadProps, List, message, notification } from 'antd';
import { Layout, Menu, theme, DatePicker,Select, MenuProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {Col, Row} from 'antd';
import './RequestDetails.css';
import { getBearDepartments } from '../../Services/PaymentRequest/apiForm';
import { useDispatch, useSelector } from 'react-redux';
import { setListDetailAPI } from './Store/tableSlice';
import { updatePayMethod,
        updateTotalAmount,
        updateTax,
        updateAdvanceAmount,
        updateTotalPayment } from './Store/calculateSlice';
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
import { RootState } from './Store';
  
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
    invDate: string;
    paymentContent: string;
    amount: number;
    invNo: number;
    industry: string;
    departmentBear: string;
    note: string;
  }
  
  interface ItemAPI {
    invDate: string;
    paymentContent: string;
    amount: number;
    invNo: number;
    industry: string;
    departmentBear: string;
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
  
  
    
  type PaymentMethodData = {
    paymentMethod :string;
  };
  const TableRequest: React.FC = () => {
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
      const inputNode = inputType === 'number' ? <InputNumber maxLength={14} /> : <Input />;
      
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{ margin: 0 }}
              rules={[
                {
                  required: ['invDate', 'paymentContent', 'amount'].includes(dataIndex),
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {dataIndex === 'invDate' ? (
                <DatePicker
                  
               />
              )
              :
              dataIndex === 'departmentBear' ? (
                <Select
                showSearch
                defaultValue="Nothing selected"
                style={{ width: 200 }}       
            > 
            
                        {bearDepartmentList.map((departmentName) => (
                          <option key={departmentName} value={departmentName}>                          
                            {departmentName}
                          </option>
                        ))}
                        </Select>
                     
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
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState<Item[]>([
      {
        key: '0',
        invDate: '',
        paymentContent: '',
        amount: 0,
        invNo: 0,
        industry: '',
        departmentBear:'',
        note: '',
  }
    ]);
    useEffect(() => {
      fetchData();
    }, []);
    const [bearDepartmentList, setBearDepartmentList] = useState<string[]>([]);
    const fetchData = async () => {
      try {
        const bearDepartmentResponse = await getBearDepartments();
  
  
        setBearDepartmentList(bearDepartmentResponse);
        
      } catch (error) {
        console.error(error);
      }
    };
  
    const tableDataAPI = tableData.map(({ key, ...rest }) => rest);
    const [ListDetail, setListDetail] = useState<string[]>([]);
    const jsonString = JSON.stringify(tableData);
    const dispatch = useDispatch();
    const ListDetailAPI = useSelector((state: RootState) => state.table.ListDetailAPI);
    const payMethod = useSelector((state: RootState) => state.cal.payMethod);
    const total_Amount = useSelector((state: RootState) => state.cal.totalAmount);
    const tax = useSelector((state: RootState) => state.cal.tax);
    const advance_Amount = useSelector((state: RootState) => state.cal.advanceAmount);
    const total_Payment = useSelector((state: RootState) => state.cal.totalPayment);
    
  
    useEffect(() => {
      // Chuyển đổi tabledetail thành chuỗi JSON và cập nhật ListApproveAPI
      const jsonString = JSON.stringify(tableDataAPI);
      dispatch(setListDetailAPI(jsonString));
    }, [tableDataAPI, dispatch]);



  // Sử dụng giá trị ListDetailAPI trong component
  console.log(tableData)
 

      const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodData>({paymentMethod:''});
  
    const handleDepartmentChange = (newValue: string) => {
      // Lấy giá trị mới của Department từ tham số newValue
      // Cập nhật lại chuỗi dữ liệu Item dựa trên giá trị mới của Department
      
      // Ví dụ: Tạo một bản sao của chuỗi   dữ liệu Item
      const updatedData = [...tableData];
      
      // Tìm phần tử hiện tại trong chuỗi dữ liệu Item
      const currentItem : Item | undefined = updatedData.find(item => item.key === '0');
      
      // Cập nhật giá trị của Department trong phần tử hiện tại
      if(currentItem){currentItem.departmentBear = newValue;}
      else {}
      
      // Cập nhật lại chuỗi dữ liệu Item
      setTableData(updatedData);
  
    };
  
    const handleDateChange = (date: Dayjs, record: Item) => {
      const newData = tableData.map((item) => {
        if (item.key === record.key) {
          return { ...item, invDate: date };
        }
        return item;
      });

  
    };
    const [count, setCount] = useState(1);
    const [editingKey, setEditingKey] = useState('');
    
  
    const isEditing = (record: Item) => record.key === editingKey;
  
    const edit = (record: Partial<Item> & { key: React.Key }) => {
      form.setFieldsValue({ 
        invDate: '',
        paymentContent: '',
        amount: '', 
        invNo: '', 
        industry: '',
        cost_departmentBear: '',
        note: '', 
        ...record });
      setEditingKey(record.key);
    };

    useEffect(() => {
      // Thực hiện gọi hàm edit với record bạn muốn chỉnh sửa mặc định khi trang được tải
      const recordToEdit = { key: '0', invDate: '', paymentContent: '', amount: 0, invNo: 0, industry: '', cost_departmentBear: '', note: '' };
      edit(recordToEdit);
    }, []); // [] đảm bảo rằng useEffect chỉ được gọi một lần khi trang được tải
  
    const cancel = () => {
      setEditingKey('');
    };
    const formatDate = (dateString: string): string => {
      const date = dayjs(dateString);
      return date.format('YYYY-MM-DD');
    };
    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as Item;
        const newData = [...tableData];
        const index = newData.findIndex((item) => key === item.key);
        if (row.amount < 0 || row.invNo < 0) {
          // Hiển thị cảnh báo
          notification.error({
            message: 'Number Error :(',
            description: 'You already entered a Invalid Number. Amount or Invoice/Rec No cannot nagative. Please enter agian !',
          });
          return; // Dừng tiến trình lưu nếu có lỗi
        }
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
            invDate: formatDate(row.invDate),
          });
          calculateTotalAmount();
          calculateTotal();
          setTableData(newData);
          setListDetail([jsonString]);
          setEditingKey('');
        } else {
          newData.push(row);
          setTableData(newData);
          setListDetail([jsonString]);
          dispatch(setListDetailAPI(ListDetail))

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
        dataIndex: 'invDate',
        width: '15%',
        editable: true,
        render: (date : Dayjs | undefined, record: Item) => {
          const editing = isEditing(record);
          return editing ? (
          <DatePicker
            value={date !== undefined ? date : dayjs()}
            onChange={(date: string | number | dayjs.Dayjs | Date | null | undefined) => handleDateChange(dayjs(date), record)}
          />):(<span>{dayjs(date).format('YYYY-MM-DD')}</span>);
      },
      },    
      {
        title: 'Pay Content',
        dataIndex: 'paymentContent',
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
        dataIndex: 'invNo',
        width: '15%',
        editable: true,
      },
      {
        title: 'Cost-bearing Industry',
        dataIndex: 'industry',
        width: '15%',
        editable: true,
      },
      {
        title: 'Department bear the cost',
        dataIndex: 'departmentBear',
        width: '15%',
        editable: true,
        render:(_:any, record: Item) => {
          const editing = isEditing(record);
          return editing ? (
          <Select
        defaultValue="1"
        style={{ width: 200 }}
        onChange={handleDepartmentChange}
          >
            {bearDepartmentList.map((departmentName) => (
                        <option key={departmentName} value={departmentName}>                          
                          {departmentName}
                        </option>
                      ))}
          </Select> 
        ):(<span>{record.departmentBear}</span>);
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
            <EditFilled style={{ fontSize: '30px' }} />
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <DeleteFilled style={{ fontSize: '30px' }} />
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
          inputType: col.dataIndex === 'amount' || col.dataIndex === 'invNo' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    const handleAdd = () => {
      const newData: Item = {
        key: count.toString(),
        invDate: dayjs().toString(),
        paymentContent: '',
        amount: 0,
        invNo: 0,
        industry: '',
        departmentBear: '',
        note: '',
      };
      calculateTotalAmount();
      calculateTotal();
      setTableData([...tableData, newData]);
      setCount(count + 1);
      setEditingKey(newData.key);
      form.resetFields();
      setListDetail([jsonString]);
      dispatch(setListDetailAPI(ListDetail))

   
      
    };
  
    const handleDelete = (key: React.Key) => {
      const newData = tableData.filter((item) => item.key !== key);
      calculateTotalAmount();
      calculateTotal();
      setTableData(newData);
      setListDetail([jsonString]);
      dispatch(setListDetailAPI(ListDetail))
  
    };
  
    const [totalAmount, setTotalAmount] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [total, setTotal] = useState(0);
    const [advanceAmount,setAdvanceAmount] =useState(0)

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
    
    const handleAdvanceAmount = (value: number | null) => {
      if (value !== null) {
      setAdvanceAmount(value);
      // const newTotalAmount = totalAmount + calculateTax() - value;
      // setTotalAmount(newTotalAmount);
    }
    };
  
    const calculateTotal = () => {
      const taxAmount = calculateTax();
      const total = totalAmount + taxAmount-advanceAmount;
      setTotal(total);
    };
    useEffect(() => {
      calculateTotal();
       
    }, [totalAmount, taxPercentage, advanceAmount]);

    
  
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

    const [methodPayment, setMethodPayment] = useState('Cash');
    const methodOptions = [
      { value: 'cash', label: 'Cash', payment_method: 'Cash' },
      { value: 'bank_transfer', label: 'Bank Transfer', payment_method: 'Bank Transfer' },
    ];
    const handlePaymentMethodChange = (value: string) => {
          
      if (value !== 'Cash') {
        setMethodPayment("Bank Transfer")
      }
      if (value === 'bank_transfer') {
        setShowBankAccountForm(true);
      } else {
        setShowBankAccountForm(false);
      }
      console.log(value);
      console.log(methodPayment)

    };
    // useEffect(() => {
    //   console.log('Bank Transfer Data:', bankTransferData);
    // }, [bankTransferData]);
  
    

  console.log(totalAmount)
  console.log(taxPercentage)
  console.log(advanceAmount)
  console.log(total)
  
  dispatch(updatePayMethod(methodPayment));
  dispatch(updateTotalAmount(totalAmount));
  dispatch(updateTax(taxPercentage));
  dispatch(updateAdvanceAmount(advanceAmount));
  dispatch(updateTotalPayment(total));

  console.log(ListDetail)

  const formatNumberWithCommas = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  


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
                      <Input defaultValue={"NH TMCP NGOAI THUONG VN"} onChange={(e :any) =>
              setBankTransferData({ ...bankTransferData, bankName: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                      name="accountNumber"
                      label="Account Number"
                      rules={[{ required: true, message: 'Please enter account number' }]}
                    >
                      <Input defaultValue={"0441000740036"} onChange={(e: any) =>
              setBankTransferData({ ...bankTransferData, accountNumber: e.target.value })}/>
                    </Form.Item>
                    <Form.Item
                      name="beneficiary"
                      label="Beneficiary"
                      rules={[{ required: true, message: 'Please enter beneficiary' }]}
                    >
                      <Input defaultValue={"CONG TY TNHH OPUS SOLUTION"} onChange={(e : any) =>
              setBankTransferData({ ...bankTransferData, beneficiary: e.target.value })} />
                    </Form.Item>
                    {/* Thêm các trường thông tin khác của tài khoản ngân hàng */}
                  </div>
                )}
 
</Form></Col>
      <Col span={12}>     
      <Form className='form-calculate'>
  <div style={{ marginBottom: '16px', fontWeight: 'bold',fontSize: '18px' }}>
    Total Amount: <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}>{formatNumberWithCommas(totalAmount)}</span>
  </div>
  <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>Tax:
  <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}></span>
    <InputNumber
      bordered={false}
      value={taxPercentage}
      onChange={handleTaxChange}
      min={0}
      max={100}
      formatter={(value: any) => `${value}%`}
      // parser={(value) => value ? value.replace('%', '') : ''}
    />
  </div>
  <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>Advance amount:
  <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}></span>
    <InputNumber
      style={{width:200}}
      maxLength={15}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      value={advanceAmount}
      onChange={handleAdvanceAmount}
    />
    </div>
  <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>
    Total Payment: <span style={{ textAlign: 'right', display: 'inline-block', minWidth: '100px' }}>{formatNumberWithCommas(total)}</span>
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