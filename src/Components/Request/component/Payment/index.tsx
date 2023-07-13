import React from 'react'
import Payment from './Payment'
import HeaderPayment from './Header'
import DropdownFilter from './DropdownFilter'

const PaymentAll:React.FC = () => {
  return (
    <div style={{paddingTop:"64px"}}>
        <HeaderPayment/>
        <Payment/>
        {/* <DropdownFilter/> */}
    </div>
  )
}

export default PaymentAll