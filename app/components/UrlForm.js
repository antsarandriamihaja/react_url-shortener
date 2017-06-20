import React, { Component } from 'react';

function UrlForm({ handleShorten, handleUrlChange, link , error}) {
    return (
        <div className='service card fadeIn'>
            <div id='instructions'>
                <h1> URL-shortening service</h1>
                <h4>Enter the URL you wish to shorten below. </h4>
                <br />
            </div>
            <div className='url_form'>
                <form id='user_url' data-toggle='validator' onSubmit={handleShorten}  >
                    <div className="form-group">
                        <input name='url' onChange={handleUrlChange} id="url-field" type="text" className="form-control input-lg" placeholder="URL to shorten (format: http://www.example.com)"
                            required />
                    </div>

                    <div className="help-block with-errors">{error}</div>
                    <div>
                        <button className="btn gov shorten" type="submit">SHORTEN</button>
                    </div>
                </form>
            </div>
            <div className='results'>
                <div className='shorter'>
                    <div id="link">{link}</div>
                </div>
            </div>
        </div>
    )

}

export default UrlForm