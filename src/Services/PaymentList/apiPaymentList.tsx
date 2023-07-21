import axios from "axios";

export const getSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/Supplier');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
