import React, { Component } from 'react';


function Form({handleFormSubmit}) {
    return (
        <div className='container'>
            <div className='form_title'>
                <img id='logo' src="https://www.international.gc.ca/world-monde/assets/images/funding-financement/GOC_colour_en.png" alt="gov_logo" />
            </div>

            <div className='card'>
                <div className='user_form'>
                    <div className='form_instructions'>
                        <h1>URL-shortening service: Application form.</h1>
                        <br />
                        <h5> Your privacy is important to us. Please provide us with your personal information. </h5>
                        <br />
                    </div>
                    <form id='user_form' action="/getUserInfo" method='post' className='form-horizontal' data-toggle='validator'>
                        <div className="form-group">
                            <input name='userName' className="form-control" type="text" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <input name='address' className="form-control" type="text" placeholder="Street Address" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="number" placeholder="Apartment, Suite, Rm" />
                        </div>
                        <div className="form-group">
                            <input name='city' className="form-control" type="text" placeholder="City" />
                        </div>
                        <div className="form-group">
                            <input name='zipCode' className="form-control" type="text" placeholder="Zip Code" />
                        </div>
                        <div className="form-group">
                            <input name='email' className="form-control" type="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input name='phone' className="form-control" type="tel" placeholder="1-(555)-555-5555" />
                        </div>
                        <div className='input-group'>
                            <label >Marital status: </label>
                            <div className='input-group'>

                                <select className='form-control' id='severity' required>
                                    <option value="single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>

                                </select>
                            </div>
                        </div>
                        <br />
                        <div className='input-group'>
                            <label >Status in Canada: </label>
                            <div className='input-group'>

                                <select className='form-control' id='status' required>
                                    <option value="Citizen">Canadian Citizen</option>
                                    <option value="PR">Permanent Resident</option>
                                    <option value="TR">Temporary Resident</option>

                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="submit">

                            <button onClick = {handleFormSubmit} type="submit" className="btn btn-primary btn-lg">Proceed to payment</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form