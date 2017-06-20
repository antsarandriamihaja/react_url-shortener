import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

class _StripeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: false,
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chargeToken = this.chargeToken.bind(this)
    }

    chargeToken(token) {
        fetch('/api/getCardToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token),

        }).then(response => {
            //console.log('response in fetch promise', response)
            response.json().then(data => {
                if (data.status === 'ok') {
                    this.props.handlePayment()
                }
            })
        })
    }
  

    handleSubmit(e) {
        e.preventDefault();
        this.props.stripe.createToken({ name: 'test-name' }).then((payload) => {
           //console.log('payload: ', payload)
            if (payload.token) {
                this.chargeToken(payload.token);
            }
            else if (payload.error) {
                this.setState({
                    payment: false,
                    error: payload.error.message
                })
              //  console.log('error message: ', payload.error.message)
            }
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='form_title'>
                    <img id='logo' src="http://www.international.gc.ca/world-monde/assets/images/funding-financement/GOC_colour_en.png" alt="gov_logo" />
                </div>
                <div className='card stripe'>
                    <div className='title'>
                        <h2>Billing information</h2>
                        <br />
                        <h4>In order to use the URL-shortening service, a processing fee of <strong>$250.99</strong> is required. <br /> <br /> Please enter your credit card information below.</h4>
                    </div>
                    <br />
                    <form action='/getCardToken' method="post" id="payment-form" className='form-horizontal' >
                        <div className='user_input'>
                            <div>
                                <label htmlFor="card">Name as it appears on card: </label>
                                <input type="text" className="form-control" id="name" placeholder="Name on Card" name="cardholder" required />
                            </div>
                            <br />
                            <label> Card details </label>
                            <div id="card-element">
                                <CardElement />
                            </div>
                            <div id='card-errors'>{this.state.error}</div>
                                
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Submit Payment</button>

                    </form>
                </div>

            </div>
        )
    }
}

const StripeForm = injectStripe(_StripeForm);

export default StripeForm;