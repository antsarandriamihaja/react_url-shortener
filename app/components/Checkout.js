import React from 'react';
import { Elements } from 'react-stripe-elements';
import StripeForm from './StripeForm';


function Checkout({handlePayment}) {
    return (
        <Elements>
            <StripeForm handlePayment={handlePayment}/>
        </Elements>
    )
}

export default Checkout 