import React from 'react';
import FormRequest from './FormRequest';
import TableRequest from './TableRequest';
import axios from 'axios';
import dayjs from 'dayjs';
import Item from 'antd/es/descriptions/Item.js';
import AttachmentRequest from './AttachmentRequest';
import ApproverRequest from './ApproverRequest';

const ParentComponent = () => {

  return (
    <div style={{paddingTop: 64}} >
      <FormRequest  />
      <TableRequest onChange={function (data: { paymentMethod: string; }): void {
        throw new Error('Function not implemented.');
      } } />
      <AttachmentRequest/>
      <ApproverRequest/>
    </div>  
  );
};

export default ParentComponent;
