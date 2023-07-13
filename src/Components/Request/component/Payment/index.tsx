import React from 'react'
import Payment from './Payment'
import HeaderPayment from './Header'
import DropdownFilter from './DropdownFilter'

const PaymentAll:React.FC = () => {
  return (
    <div>
        <HeaderPayment/>
        <Payment/>
    </div>
  )
}

export default PaymentAll