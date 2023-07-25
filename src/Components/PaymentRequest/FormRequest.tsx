import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Layout, Row, theme } from 'antd';
import './RequestDetails.css';
import { Input, Select } from 'antd';
import { getSuppliers, getCurrencies, getDepartments, postPaymentRequest } from '../../Services/PaymentRequest/apiForm'

const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;

const FormRequest: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const [form] = Form.useForm();
  //test api
  const [supplierData, setSupplierData] = useState<string[]>([]);
  const [currencyData, setCurrencyData] = useState<string[]>([]);
  const [departmentData, setDepartmentData] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supplierResponse = await getSuppliers();
      const currencyResponse = await getCurrencies();
      const departmentResponse = await getDepartments();

      setSupplierData(supplierResponse);
      setCurrencyData(currencyResponse);
      setDepartmentData(departmentResponse);
    } catch (error) {
      console.error(error);
    }
  };



  const onSubmit = async () => {
    try {
      const formValues = form.getFieldsValue();
      const response = await postPaymentRequest(formValues);
      if (response) {
        // Xử lý kết quả trả về từ API (nếu cần)
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout hasSider>
      <Layout >
        <Content className='content-center'>
          <div style={{ paddingTop: 64, textAlign: 'center', background: colorBgContainer }}>
            <h1 style={{ fontSize: 28 }}>PAYMENT REQUEST</h1>
            <div className='row'>
              <div className='font_text'>
                <Form
                  name='paymentRequest'
                  form={form}
                  onFinish={onSubmit}
                >
                  <Row gutter={16}>
                  <Col span={8}>
                  <Form.Item
                    label='Purpose'
                    name='purpose'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      style={{ width: 200 }}
                      placeholder="Purpose"
                    />
                  </Form.Item>
                  </Col>
                  
                  <Col span={8}>
                  <Form.Item
                    label='Department'
                    name='department'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <Select
                      style={{ width: 200 }}
                      key="department"
                    >
                      {departmentData.map((departmentName) => (
                        <Option key={departmentName} value={departmentName}>
                          {departmentName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <FormItem
                    label='Payment For'
                    name='paymentFor'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      style={{ width: 200 }}
                      placeholder="Payment For"
                    />
                  </FormItem>
                  </Col>
                  </Row>
                  <Row gutter={16}>
                  <Col span={8}>
                  <Form.Item
                    label='Supplier'
                    name='supplier'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <Select
                      style={{ width: 200 }}
                      key="supplier"                      
                    >
                      {supplierData.map((supplierName) => (
                        <Option key={supplierName} value={supplierName}>
                          {supplierName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label='Currency'
                    name='currency'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <Select
                      style={{ width: 200 }}
                      key="currency"                      
                    >
                      {currencyData.map((currencyName) => (
                        <Option key={currencyName} value={currencyName}>
                          {currencyName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <FormItem
                    label='PO/PR number'
                    name='poPrNumber'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      style={{ width: 200 }}
                      placeholder="PO/PR number"
                    />
                  </FormItem>
                  </Col>
                  </Row>
                  {/* <Button onClick={() => form.submit()}>Submit</Button> */}
                </Form>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FormRequest;
