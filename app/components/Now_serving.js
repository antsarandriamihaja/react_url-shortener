import React, {Component} from 'react';

function Now_serving({startCount, count}){
     
    return (
         <div className = 'page1'>
            <div className ='form_title'> 
                <img id='logo' src="https://www.international.gc.ca/world-monde/assets/images/funding-financement/GOC_colour_en.png" alt="gov_logo"/>
            </div>
            <div className='now_serving fadeIn'>
                <div id='wait_instruction'>
                    <h1>Please wait for your turn.</h1>
                </div>
                <div id='serving_box'>
                    <h2>
                        NOW SERVING
                    </h2>
                    <div className='counting' >                        
                       
                        <span id='count'>{count}</span>
                    </div>
                </div>
            </div>
            
            <div className='display_number yaxis'>
                <div className='user_number xaxis'>
                    <img id='user_number' src="https://modernweb.com/wp-content/uploads/2014/02/icon_28196_67.png" alt="user_number"/>
                </div>
            </div>
    
        </div>
    )
}

export default Now_serving