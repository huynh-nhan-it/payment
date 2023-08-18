// rootReducer.js
import { combineReducers } from 'redux';
import formReducer from './formSlice';
import tableReducer from './tableSlice';
import calReducer from './calculateSlice';
import approveReducer from './approveSlice';
// import typeReducer from './typeSlice'

const rootReducer = combineReducers({
  form: formReducer,
  table: tableReducer,
  cal: calReducer,
  approve: approveReducer,
  // type: typeReducer,
});

export default rootReducer;