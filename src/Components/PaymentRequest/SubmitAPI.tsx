import axios from 'axios';
import { setListDetailAPI } from './Store/tableSlice';
import { setListApproveAPI } from './Store/approveSlice';
import { updatePurpose, updateDepartment, updatePaymentFor, updateSupplier, updateCurrency, updateExchangeRate, updatePoPrNumber } from './Store/formSlice';
import { updatePayMethod, updateTotalAmount, updateTax, updateAdvanceAmount, updateTotalPayment } from './Store/calculateSlice';

export const submitForm = (formData: { form: any; table: any; approve: any; cal: any; }) => async (dispatch: (arg0: { payload: any; type: "form/updatePurpose" | "form/updateDepartment" | "form/updatePaymentFor" | "form/updateSupplier" | "form/updateCurrency" | "form/updateExchangeRate" | "form/updatePoPrNumber" | "table/setListDetailAPI" | "form/updatePayMethod" | "form/updateTotalAmount" | "form/updateTax" | "form/updateAdvanceAmount" | "form/updateTotalPayment" | "approve/setListApproveAPI"; }) => void) => {
  try {
    const formState = formData.form;
    const tableState = formData.table;
    const approveState = formData.approve;
    const calState = formData.cal;

    const payload = {
      purpose: formState.purpose,
      department: formState.department,
      paymentFor: formState.paymentFor,
      supplier: formState.supplier,
      currency: formState.currency,
      exchangeRate: formState.exchangeRate,
      poPrNumber: formState.poPrNumber,
      ListDetailAPI: tableState.ListDetailAPI,
      payMethod: calState.payMethod,
      totalAmount: calState.totalAmount,
      tax: calState.tax,
      advanceAmount: calState.advanceAmount,
      totalPayment: calState.totalPayment,
      ListApproveAPI: approveState.ListApproveAPI,
    };

    // Gửi request POST đến API sử dụng Axios
    const response = await axios.post('http://localhost:5005/api/User/create-request', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Kiểm tra response từ server và xử lý dữ liệu nếu cần
    const data = response.data;
    // Xử lý dữ liệu nếu cần

    // Ví dụ, trong trường hợp bạn muốn cập nhật lại dữ liệu từ server vào Redux store
    dispatch(updatePurpose(data.purpose));
    dispatch(updateDepartment(data.department));
    dispatch(updatePaymentFor(data.paymentFor));
    dispatch(updateSupplier(data.supplier));
    dispatch(updateCurrency(data.currency));
    dispatch(updateExchangeRate(data.exchangeRate));
    dispatch(updatePoPrNumber(data.poPrNumber));
    dispatch(setListDetailAPI(data.ListDetailAPI));
    dispatch(updatePayMethod(data.payMethod));
    dispatch(updateTotalAmount(data.totalAmount));
    dispatch(updateTax(data.tax));
    dispatch(updateAdvanceAmount(data.advanceAmount));
    dispatch(updateTotalPayment(data.totalPayment));
    dispatch(setListApproveAPI(data.ListApproveAPI));

    // Hoặc bạn có thể thực hiện các hành động khác sau khi gửi thành công dữ liệu lên server
    // Ví dụ, hiển thị thông báo thành công, chuyển trang, vv.
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error submitting form:', error);
    // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác nếu cần
  }
};