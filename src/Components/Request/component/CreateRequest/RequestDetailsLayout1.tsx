import React from 'react';
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
import { Layout, Menu, theme } from 'antd';
import { Input, Select } from 'antd';


//xử lý option Department
const handleChangeDeparment = (value: string) => {
    console.log(`selected ${value}`);
  };

//xử lý option Payment
const handleChangePayment = (value: string) => {
    console.log(`selected ${value}`);
  };

  //xử lý option Supplier
const handleChangeSupplier = (value: string) => {
    console.log(`selected ${value}`);
  };

//xử lý option Currency
const handleChangeCurrency = (value: string) => {
    console.log(`selected ${value}`);
  };
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

const RequestDetailsLayout1: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Layout >
        <Content style={{overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <h1 style={{fontSize: 28}}>PAYMENT REQUEST</h1>
            <td className='font_text'>
                Purpose
                <tr>
                <Input style={{width:200}} placeholder="Purpose" />
                </tr>
            </td>
            <td className='font_text'>
                Department
                <tr>
                    <Select
                        defaultValue="1"
                        style={{ width: 200 }}
                        onChange={handleChangeDeparment}
                        options={[
                            { value: '1', label: 'IT/Technical' },
                            { value: '2', label: 'OPUS Company' },
                            { value: '3', label: 'Human Resource' },
                            { value: '', label: 'Disabled', disabled: true },
                        ]}
                    />
                </tr>
            </td>
            <td className='font_text'>
                Payment for
                <tr>
                    <Select
                        defaultValue="1"
                        style={{ width: 200 }}
                        onChange={handleChangePayment}
                        options={[
                            { value: '1', label: 'FIN' },
                            { value: '', label: 'HR' },
                            { value: '', label: 'Khác' },
                            { value: '', label: 'Disabled', disabled: true },
                        ]}
                    />
                </tr>
            </td>
            <br></br>
            <td className='font_text'>
            Supplier
                <tr>
                    <Select
                        defaultValue="1"
                        style={{ width: 200 }}
                        onChange={handleChangeSupplier}
                        options={[
                            { value: '1', label: 'Nothing selected' },
                            { value: '', label: 'Công Ty TNHH OPUS Solution' },
                            { value: '', label: 'Disabled', disabled: true },
                        ]}
                    />
                </tr>
            </td>
            <td className='font_text'>
            Currency
                <tr>
                    <Select
                        defaultValue="1"
                        style={{ width: 200 }}
                        onChange={handleChangeCurrency}
                        options={[
                            { value: '1', label: 'VND (đ)' },
                            { value: '', label: 'USD ($)' },
                            { value: '', label: 'Disabled', disabled: true },
                        ]}
                    />
                </tr>
            </td>
            <td className='font_text'>
                PO/PR number
                <tr>
                <Input style={{width:200}} placeholder="PO/PR number" />
                </tr>
            </td>
          </div>
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default RequestDetailsLayout1;