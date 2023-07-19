import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Form, Layout, Menu, theme } from 'antd';
import './RequestDetails.css';
import { Input, Select } from 'antd';
import axios from 'axios';
import TableRequest from './TableRequest';

const { Content, Sider } = Layout;
const FormItem = Form.Item;

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

type FormRequestProps = {
  onChange: (data: FormData) => void;
};

type FormData = {
  purpose: string;
  department: string;
  paymentFor: string;
  supplier: string;
  currency: string;
  poPrNumber: number;
};

const FormRequest: React.FC<FormRequestProps> = ({ onChange }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    department: '',
    paymentFor: '',
    supplier: '',
    currency: '',
    poPrNumber: 0,
  });
  const [form] = Form.useForm();

  const handleChange = (event: any) => {
    const { name, value } = event.target || {};
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      console.log(formData)
    }

  };

  const handleDepartmentChange = (value: string) => {

    setFormData((prevFormData) => ({
      ...prevFormData,
      department: value,
    }));

  };

  const handlePaymentForChange = (value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentFor: value,
    }));

  };

  const handleSupplierChange = (value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      supplier: value,
    }));
  };

  const handleCurrencyChange = (value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      currency: value,
    }));
  };

  //test api
  const [supplierData, setSupplierData] = useState<{ id: string; name: string }[]>([]);
  const [currencyData, setCurrencyData] = useState<{ id: string; name: string }[]>([]);
  const [departmentData, setDepartmentData] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supplierResponse = await axios.get('http://localhost:5005/api/Supplier');
      const currencyResponse = await axios.get('http://localhost:5005/api/Currency');
      const departmentResponse = await axios.get('http://localhost:5005/api/Department');

      setSupplierData(supplierResponse.data);
      setCurrencyData(currencyResponse.data);
      setDepartmentData(departmentResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTableDataChange = (data: any) => {
    form.setFieldsValue({
      'tableDetails': data
    })
    // setRequest((prevData) => ({
    //   ...prevData,
    //   paymentMethod: data,
    // }));
  };

  const onSubmit = () => {
    console.log(form.getFieldsValue())
  }

  return (
    <Layout hasSider>
      <Layout >
        <Content className='content-center'>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <h1 style={{ fontSize: 28 }}>PAYMENT REQUEST</h1>
            <div className='row'>
              <div className='font_text'>
                <Form
                  name='paymentRequest'
                  form={form}
                  onFinish={onSubmit}
                >
                  <FormItem
                    label='Purpose'
                    name='purpose'
                  >
                    <Input
                      style={{ width: 200 }}
                      placeholder="Purpose"
                      // onChange={handleChange}
                    />
                  </FormItem>
                  <FormItem
                    label='Department'
                    name='department'
                  >
                    <Select
                      style={{ width: 200 }}
                      key="department"
                      options={departmentData.map((item) => (
                        {
                          value: item.id,
                          label: item.name
                        }
                      ))}
                      // onChange={handleDepartmentChange}
                    >
                    </Select>
                  </FormItem>
                  <FormItem
                    name='tableDetails'
                  >
                    <TableRequest onChange={handleTableDataChange} />
                  </FormItem>
                  <Button onClick={() => form.submit()}>Submit</Button>
                </Form>

              </div>

              <div className='font_text'>
                <label>Department</label>
                <div>
                  {departmentData.length > 0 ? (
                    <Select
                      style={{ width: 200 }}
                      key="department"
                      value={formData.department}
                      onChange={handleDepartmentChange}>{departmentData.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}</Select>
                  ) : (
                    <Select style={{ width: 200 }} key="department" disabled />)}

                </div>
              </div>
              <div className='font_text'>
                <label>Payment for</label>
                <div>
                  <Select
                    style={{ width: 200 }}
                    key="paymentFor"
                    value={formData.paymentFor}
                    onChange={handlePaymentForChange}
                    options={[
                      { value: '(FIN) Thanh toán các khoản NSNN', label: '(FIN) Thanh toán các khoản NSNN' },
                      { value: 'HR', label: 'HR' },
                      { value: 'Khác', label: 'Khác' },
                      { value: 'Diasable', label: 'Disabled' },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='font_text'>
                <label>Supplier</label>
                <div>
                  {supplierData.length > 0 ? (
                    <Select
                      style={{ width: 200 }}
                      key="supplier"
                      value={formData.supplier}
                      onChange={handleSupplierChange}>{supplierData.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}</Select>
                  ) : (
                    <Select style={{ width: 200 }} key="supplier" disabled />)}

                </div>
              </div>
              <div className='font_text'>
                <label>Currency</label>
                <div>
                  {currencyData.length > 0 ? (
                    <Select
                      style={{ width: 200 }}
                      key="currency"
                      value={formData.currency}
                      onChange={handleCurrencyChange}>{currencyData.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}</Select>
                  ) : (
                    <Select style={{ width: 200 }} key="currency" disabled />)}

                </div>
              </div>
              <div className='font_text'>
                <label>PO/PR number</label>
                <div>
                  <Input
                    style={{ width: 200 }}
                    placeholder="PO/PR number"
                    name="poPrNumber"
                    value={formData.poPrNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

        </Content>
      </Layout>
    </Layout>
  );
};

export default FormRequest;


