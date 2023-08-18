import React from 'react';
import './footer.css'

const AppFooter = () => {
  return (
    <footer className='footer-inside'>
     <div className='footer-left'>
        <div className='padding-right-8'>Tasken C </div> 
        <div className='padding-right-8'><a style={{color:"#fff"}} href='/'> Opus Solution</a></div>
     </div>
     
     <div className='footer-right'>
        <div className='padding-right-8'>Website</div>
        <div className='padding-right-8'>Terms</div>
        <div className='padding-right-8'>About</div>
     </div>
    </footer>
  );
};

export default AppFooter;