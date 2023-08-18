import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './Store'; // Đảm bảo import đúng đường dẫn đến Store

import App from './SubmitRequest'; // Thay thế App bằng component chứa các component của bạn

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// Bao lại App bằng Provider và truyền store vào

const SubmitRequest: React.FC = () => { 
  return (
    <Provider store={store}>
      <div>
        <App />
      </div>  
    </Provider>
  )
}

export default SubmitRequest






