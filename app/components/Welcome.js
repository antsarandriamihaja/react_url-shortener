import React, {Component} from 'react';

function Welcome({handleClickTicket, page}){
    return (
        <div className = 'page1'>
            <div className ='form_title fadeIn'> 
                <img id='logo' src="https://www.international.gc.ca/world-monde/assets/images/funding-financement/GOC_colour_en.png" alt="gov_logo"/>
            </div>
            <div id='welcome_message' className='welcome_message fadeIn'>
                <h1 id='welcome'>
                    Welcome to the government-funded URL-shortening service.
                </h1>
            </div>
            
            <div className='give_number'>
                <h3 id='instructions_number'>
                    Please take a number.
                </h3>
                <hr className='stylehr'/>
            </div>

            <div className='display_number'>
                <div className='user_number' onClick = {handleClickTicket}>
                    <img id='user_number' src="https://modernweb.com/wp-content/uploads/2014/02/icon_28196_67.png" alt="user_number"/>
                </div>
            </div>
            <div className='hours'>
                <h7 id='service_hours'> We are open from 10am to 3pm on Monday through Friday. <br/> Except on holidays including Mother's Day, Thanksgiving,
                    Labour Day, Remembrance Day, and others. <br/> We also take a lunch break from 11am-1pm so time your arrival
                    appropriately. Thank you. </h7>
            </div>
        </div>
    )
}

export default Welcome