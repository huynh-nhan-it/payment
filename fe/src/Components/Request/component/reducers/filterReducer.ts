// reducers/filterReducer.ts

interface FilterState {
  purpose: string;
  requestCode: string;
  createdDateFrom: string;
  createdDateTo: string;
  createdBy: string;
  status: string;
}

const initialState: FilterState = {
  purpose: '',
  requestCode: '',
  createdDateFrom: '',
  createdDateTo: '',
  createdBy: '',
  status: '',
};

const filterReducer = (state = initialState, action: any): FilterState => {
  switch (action.type) {
    case 'APPLY_FILTER':
      // console.log(action.payload);
      return { ...state, ...action.payload };
    case 'RESET_FILTER':
      return { ...initialState };
    default:
      return state;
  }
};

export default filterReducer;
