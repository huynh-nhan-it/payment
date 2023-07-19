// actions.ts

export const applyFilter = (
    purpose: string,
    requestCode: string,
    createdDateFrom: string,
    createdDateTo: string,
    createdBy: string,
    status: string,
  ) => {
    return {
      type: 'APPLY_FILTER',
      payload: {
        purpose,
        requestCode,
        createdDateFrom,
        createdDateTo,
        createdBy,
        status
      },
    };
  };
  
  export const resetFilter = () => {
    return {
      type: 'RESET_FILTER',
    };
  };
  