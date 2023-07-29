import { message } from 'antd';


export const PurposeError = () => {
    const messageApi = message;
    messageApi.error('Please Enter Purpose !');
  };

  
export const PoPrError = () => {
  const messageApi = message;
  messageApi.error('Please Enter PO/PR Number !');
};
