
  import axios from "axios";

const apiPath = "http://localhost:5005/api/"

// export const getSuppliers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5005/api/Supplier');
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };
  

//   export const getDataSendToMe = async () => {
//     try {
//       const response = await axios.get(`${apiPath}/PaymentRequest/SendToMe?myId=${}`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };


  export const getDataExcel = async () => {
    try {
      const response = await axios.get(`${apiPath}PaymentRequest/GenerateExcel`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


