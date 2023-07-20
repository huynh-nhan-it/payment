import { LinkOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Upload, UploadProps } from 'antd';
import React from 'react';
import './RequestDetails.css'

const AttachmentRequest:React.FC = () => { 
    const props: UploadProps = {
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange({ file, fileList }) {
          if (file.status !== "uploading") {
            console.log(file, fileList);
          }
        },
      };
  return (
    <div className='content-left'>
          <p >Attachment(s) </p>
    <Form.Item name="files">
          <Row justify="start" align="middle">          
           <Col style={{ paddingLeft: "" }}>            
              <Upload {...props}>
                <Button type="primary" icon={<LinkOutlined />}>Upload</Button>
              </Upload>
            </Col>
                <Col style={{ paddingLeft: '1.5%' }}>(Maximum 20MB per file)</Col>
          </Row>
        </Form.Item>
    </div>
  )
}

export default AttachmentRequest;
