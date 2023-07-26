import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from './Store';
import { submitForm } from './SubmitAPI';

const useFormSubmit = () => {
    const dispatch: AppDispatch = useDispatch();


  const handleFormSubmit = () => {
    const formData = useSelector((state: RootState) => ({
      form: state.form,
      table: state.table,
      approve: state.approve,
      cal: state.cal,
    }));

    // Gọi action submitForm
    dispatch(submitForm(formData));
  };

  return { handleFormSubmit };
};

export default useFormSubmit;