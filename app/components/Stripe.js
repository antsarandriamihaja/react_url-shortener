import React, { Component } from 'react';
import {StripeProvider} from 'react-stripe-elements'

import Checkout from './Checkout';

const Stripe = ({handlePayment})=>{
    return (
        <StripeProvider apiKey ='pk_test_i0mAS5A7uVZDTpDWkbNkAIt7'>
            <Checkout handlePayment={handlePayment}/>
            </StripeProvider>
    )
}

export default Stripe