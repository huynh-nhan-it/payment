import React, { useEffect, useState } from 'react';
import { Col, Form, Layout, Row, theme } from 'antd';
import './RequestDetails.css';
import { Input, Select } from 'antd';
import { InputNumber } from 'antd';
import * as showError from "./showError";
import { useDispatch, useSelector } from 'react-redux';
import { FormValues, getCurrenciesFromApi, getDepartmentBearsFromApi, getDepartmentsFromApi, getSuppliersFromApi, setFormValuesToRedux } from './Store/submitFormReducer';
import { AppDispatch, RootState } from './Store';

const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;

export type formState =
  {
    values: {
      purpose: string,
      department: string,
      paymentFor: string,
      supplier: string,
      currency: string,
      exchangeRate: string,
      poPrNumber: number
    },
    errors: {
      purpose: string,
    }

  }

  type Props = {
    isSubmit?: boolean
  };


function NewForm({isSubmit} : Props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { supplierList, departmentList, currencyList } = useSelector((state: RootState) => state.submitFormReducer);
  const dispatch: AppDispatch = useDispatch();

  let [formState, setFormState] = useState<formState>({
    values: {
      purpose: '',
      department: '',
      paymentFor: '',
      supplier: '',
      currency: '',
      exchangeRate: '',
      poPrNumber: 0
    },
    errors: {
      purpose: '',
    }
  });

  useEffect(() => {
    dispatch(getSuppliersFromApi());
    dispatch(getDepartmentsFromApi());
    dispatch(getCurrenciesFromApi());
    dispatch(getDepartmentBearsFromApi()); return () => { }
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let { value, name } = e.target;

    let newValues = { ...formState.values };

    newValues = { ...newValues, [name]: value };

    let newErrors = { ...formState.errors };

    setFormState({
      ...formState,
      values: newValues,
      errors: newErrors
    })
  }

  const handleSelect = (value: string, name: string) => {

    let newValues = { ...formState.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...formState.errors };

    setFormState({
      ...formState,
      values: newValues,
      errors: newErrors
    })
  }
  if(isSubmit === true) {
    setFormValuesToRedux(formState.values as FormValues);
    console.log('Successfully submitted');
  }
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
                <Form name="paymentRequest" >
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
                          name='purpose'
                          onChange={handleChange}
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
                          showSearch
                          style={{ width: 200 }}
                          key="department"
                          defaultValue="OPUS Company"
                          onChange={(value) => {
                            handleSelect(value, "department");
                          }
                          }
                        >
                          {departmentList.map((departmentName) => (
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
                          name='paymentFor'
                          onChange={handleChange}
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
                          showSearch
                          style={{ width: 200 }}
                          key="supplier"
                          defaultValue="1041171-Công Ty TNHH Opus Solution"
                          onChange={(value) => {
                            handleSelect(value, "supplier");
                          }
                          }
                        >
                          {supplierList.map((supplierName) => (
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
                          showSearch
                          style={{ width: 200 }}
                          key="currency"
                          defaultValue="VND"
                          onChange={(value) => {
                            handleSelect(value, "currency");
                          }}
                        >
                          {currencyList.map((currencyName) => (
                            <Option key={currencyName} value={currencyName}>
                              {currencyName}
                            </Option>
                          ))}
                        </Select>

                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <FormItem
                        label='Exchange Rate'
                        name='exchangeRate'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                      >
                        <Input
                          style={{ width: 200 }}
                          placeholder='Exchange Rate'
                          maxLength={15}
                          name='exchangeRate'
                          onChange={handleChange}
                        // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                      </FormItem>
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
                          maxLength={15}
                          name='poPrNumber'
                          onChange={handleChange}
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
}

export default NewForm;

