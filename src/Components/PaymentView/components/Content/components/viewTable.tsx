import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  Inv: string;
  'payment-content': string;
  Amount: number;
  Invoice: number;
  'Cost-bearing': string;
  'Department-bear': string;
  Note: React.ReactNode
}

const columns: ColumnsType<DataType> = [
  {
    title: <span style={{ color: '#A3A6B4' }}>Inv/Rec date</span>,
    align: 'center',
    dataIndex: 'Inv',
  },
  {
    align: 'center',
    title: <span style={{ color: '#A3A6B4' }}>Payment content</span>,
    dataIndex: 'payment-content',
    
  },
  {
    align: 'center',
    title: <span style={{ color: '#A3A6B4' }}>Amount</span>,
    dataIndex: 'Amount',
   
  },
  {
    align: 'center',
    title: <span style={{ color: '#A3A6B4' }}>Invoice/Rec No</span>,
    dataIndex: 'Invoice',
    
  },
  {
    align: 'center',
    title: <span style={{ color: '#A3A6B4' }}> Cost-bearing Industry</span>,
    dataIndex: 'Cost-bearing',
    
  },
  {
    align: 'center',
    title: <span style={{ color: '#A3A6B4' }}> Department bear the cost</span> ,
    dataIndex: 'Department-bear',
    
  },
  {
    align: 'center',
    title: <span style={{ color: '#A3A6B4' }}>Note</span>,
    dataIndex: 'Note',
    
  },
];

const data: DataType[] = [
  {
    key: '1',
    Inv:  new Date(2023, 7, 5).toISOString(),
    'payment-content': 'Mua nhà',
  Amount: 10000000000,
  Invoice: 123456,
  'Cost-bearing': 'IT/technical',
  'Department-bear': 'FL01 - Lab - MSI',
  Note: ''
  },
  {
    key: '2',
    Inv:  new Date(2023, 7, 5).toISOString(),
    'payment-content': 'Mua nhà',
  Amount: 10000000000,
  Invoice: 123456,
  'Cost-bearing': 'IT/technical',
  'Department-bear': 'FL01 - Lab - MSI',
  Note: ''
  },
  {
    key: '3',
    Inv:  new Date(2023, 7, 5).toISOString(),
    'payment-content': 'Mua nhà',
  Amount: 10000000000,
  Invoice: 123456,
  'Cost-bearing': 'IT/technical',
  'Department-bear': 'FL01 - Lab - MSI',
  Note: ''
  },
  {
    key: '4',
    Inv:  new Date(2023, 7, 5).toISOString(),
    'payment-content': 'Mua nhà',
  Amount: 10000000000,
  Invoice: 123456,
  'Cost-bearing': 'IT/technical',
  'Department-bear': 'FL01 - Lab - MSI',
  Note: ''
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ViewTable: React.FC = () => <Table columns={columns} pagination={false} scroll={{x: 'max-content'}} dataSource={data} onChange={onChange} />;

export default ViewTable;
