import React from "react";
import { Provider } from "react-redux";
import {store} from "./Store";
import FormRequest from "./FormRequest";
import TableRequest from "./TableRequest";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <FormRequest />
        <TableRequest/>    
      </div>
    </Provider>
  );
};

export default App;
