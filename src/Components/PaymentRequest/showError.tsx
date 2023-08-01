import { message, notification } from 'antd';


export const PurposeError = () => {
    const messageApi = message;
    messageApi.error('Please Enter Purpose For Payment !');
  };

export const DepartmentError = () => {
    const messageApi = message;
    messageApi.error('Please Select Department For Payment !');
  };

export const PaymentForError = () => {
    const messageApi = message;
    messageApi.error('Please Enter Payment For Payment !');
  };

export const SupplierError = () => {
    const messageApi = message;
    messageApi.error('Please Select Supplier For Payment !');
  };  

export const CurrencyError = () => {
    const messageApi = message;
    messageApi.error('Please Select Currency For Payment !');
  };    

export const PoPrError = () => {
  const messageApi = message;
  messageApi.error('Please Enter PO/PR Number !');
};

export const NumberError = () => {
  notification.error({
    message: 'Number Error :(',
    description: 'You already entered a Invalid Number, please enter agian !',
  });
};

export const SelectError = () => {
  notification.error({
    message: 'Selection Error :(',
    description: 'You just selected Missing Data, Please fill in the data and Try Again',
  });
};