import React from "react";
import { Provider } from "react-redux";
import { AppDispatch, store } from "./Store";
import FormRequest from "./FormRequest";
import TableRequest from "./TableRequest";
import AttachmentRequest from "./AttachmentRequest";
import ApproverRequest from "./ApproverRequest";
import useFormData from './useData';
import { useDispatch } from 'react-redux';
import { submitForm } from "./SubmitAPI";
import { Button } from "antd";
const App: React.FC = () => {
  const formData = useFormData();
  const dispatch: AppDispatch = useDispatch();

  const handleFormSubmit = () => {
    // Gọi action submitForm
    dispatch(submitForm(formData));
  };

  return (
    <Provider store={store}>
      <div>
        <FormRequest />
        <TableRequest/>
        <AttachmentRequest/>
        <ApproverRequest/>   
        <Button onClick={handleFormSubmit}>Submit</Button> 
      </div>
    </Provider>
  );
};

export default App;