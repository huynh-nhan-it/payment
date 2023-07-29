import React, { useEffect, useState } from 'react';
import {Col, Form, Layout, Row, theme } from 'antd';
import './RequestDetails.css';
import { Input, Select } from 'antd';
import { InputNumber } from 'antd';
import { getSuppliers, getCurrencies, getDepartments} from '../../Services/PaymentRequest/apiForm'
import { useDispatch, useSelector } from "react-redux";
import { updatePurpose,
        updateDepartment,
        updatePaymentFor,
        updateSupplier,
        updateCurrency,
        updateExchangeRate,
        updatePoPrNumber } from './Store/formSlice';
import { RootState } from './Store';
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;

const FormRequest: React.FC = () => {
  const purpose = useSelector((state : RootState) => state.form.purpose);
  const department = useSelector((state : RootState) => state.form.department);
  const paymentFor = useSelector((state : RootState) => state.form.paymentFor);
  const supplier = useSelector((state : RootState) => state.form.supplier);
  const currency = useSelector((state : RootState) => state.form.currency);
  const exchangeRate = useSelector((state : RootState) => state.form.exchangeRate);
  const poPrNumber = useSelector((state : RootState) => state.form.poPrNumber);
  const dispatch = useDispatch();
  

  const [selectedCurrency, setSelectedCurrency] = useState<string>('VND');
  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(updatePurpose(value));
    console.log(value)
  };

  const handleDepartmentChange = (value : string) => {
    dispatch(updateDepartment(value));
    console.log(value)
  };

  const handlePaymentForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(updatePaymentFor(value));
    console.log(value)
  };

  const handleSupplierChange = (value : string) => {
    dispatch(updateSupplier(value));
    console.log(value)
  }

  const handleCurrencyChange = (value : string) => {
    dispatch(updateCurrency(value));
    setSelectedCurrency(value);
    console.log(value)
  }

  const handleExchangeRateChange = (value: any) => {
    dispatch(updateExchangeRate(value));
    setSelectedCurrency(value);
    console.log(value)
  }

  const handlePoPrNumberChange = (value:any) => {
    
    dispatch(updatePoPrNumber(value));
    console.log(value)
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();
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

  

  
  console.log(supplier)
  
  return (
    <Layout hasSider>
      <Layout>
        <Content className="content-center">
          <div
            style={{
              paddingTop: 64,
              textAlign: "center",
              background: colorBgContainer,
            }}>
            <h1 style={{ fontSize: 28 }}>PAYMENT REQUEST</h1>
            <div className="row">
              <div className="font_text">
                <Form name="paymentRequest" form={form} >
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
                      value={purpose}
                      onChange={handlePurposeChange}
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
                      
                      value={department}
                      onChange={handleDepartmentChange}
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
                      value={paymentFor}
                      onChange={handlePaymentForChange}
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
                      value={supplier}
                      onChange={handleSupplierChange}
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
                      value={currency}
                      onChange={handleCurrencyChange}
                      
                    >
                      {currencyData.map((currencyName) => (
                        <Option key={currencyName} value={currencyName}>                          
                          {currencyName}
                        </Option>
                      ))}
                      </Select>
                   
                  </Form.Item>
                  </Col>
                  {selectedCurrency !== 'VND' && (
                      <Col span={8}>
                        <FormItem
                          label='Exchange Rate'
                          name='exchangeRate'
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        > 
                          <InputNumber
                          style={{width:200}}
                          placeholder='Exchange Rate'
                          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          value={exchangeRate}
                          onChange={handleExchangeRateChange}
                          />
                        </FormItem>
                      </Col>
                    )}
                  <Col span={8}>
                  <FormItem
                    label='PO/PR number'
                    name='poPrNumber'
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }}
                  >
                    <InputNumber
                      style={{ width: 200 }}
                      placeholder="PO/PR number"
                      value={poPrNumber}
                      onChange={handlePoPrNumberChange}
                    />
                  </FormItem>
                  </Col>
                  </Row>
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

