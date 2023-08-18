import React from 'react';
import ReactLoading from 'react-loading';
import "./style.css";
const Spinner = () => (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Độ mờ và màu nền của spinner
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    <ReactLoading type="spinningBubbles" color="#F9C784" height={'100%'} width={'9%'} className='spinner-loading' />
    </div>
);
 
export default Spinner;