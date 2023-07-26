
import { useSelector } from 'react-redux';
import { RootState } from './Store';

const useFormData = () => {
  const formData = useSelector((state: RootState) => ({
    form: state.form,
    table: state.table,
    approve: state.approve,
    cal: state.cal,
  }));

  return formData;
};

export default useFormData;