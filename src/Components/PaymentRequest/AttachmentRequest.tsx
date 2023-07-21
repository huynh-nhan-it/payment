import { LinkOutlined } from '@ant-design/icons';
import { Button, Col, Form, Layout, Row, Upload, UploadProps, theme } from 'antd';
import React from 'react';
import './RequestDetails.css'
const { Content } = Layout;
const AttachmentRequest:React.FC = () => { 
    const props: UploadProps = {
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange({ file, fileList }) {
          if (file.status !== "uploading") {
            console.log(file, fileList);
          }
        },
      };  
      const {
        token: { colorBgContainer },
      } = theme.useToken();
      
  return (
    <Layout hasSider>
      <Layout >
        <Content className='content-center' >
    <div className='content-left' style={{background:colorBgContainer}}  >    
          <p>Attachment(s) </p>
    <Form.Item name="files">
          <Row justify="start" align="middle">          
           <Col style={{ paddingLeft: "" }}>            
              <Upload {...props}>
                <Button type="primary" icon={<LinkOutlined />}>Upload</Button>
              </Upload>
            </Col>
                <Col style={{ paddingLeft: '1.5%', fontWeight: 'normal' }}>(Maximum 20MB per file)</Col>
          </Row>
        </Form.Item>
    </div>
    </Content>
    </Layout>
    </Layout>
  )
}

export default AttachmentRequest;
