import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import Now_serving from './components/Now_serving';
import Form from './components/Form';
import Stripe from './components/Stripe';
//import StripeHandler from './../public/js/stripe_handler';
import 'react-lumberjack';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import UrlForm from './components/UrlForm';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Welcome',
            counter: 65,
            payment: false,
            url: '',
            link: '',
            urlError: ''
        };
        this.handleClickTicket = this.handleClickTicket.bind(this);
        this.startCount = this.startCount.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleShorten = this.handleShorten.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        // this.validateUrl = this.validateUrl.bind(this)
    }

    handleClickTicket(e) {
        e.preventDefault();
        this.setState({
            page: 'Now_serving'
        })

        this.startCount();
    }
    handlePayment() {
        this.setState({
            // isStripePage: false,
            payment: true
        })
    }
    startCount() {
        var scope = this;
        var interval = setInterval(function (xyz) {
            var now_serving
            if (scope.state.page === 'Now_serving') {
                now_serving = true
            };
            var count = scope.state.counter;
            if (now_serving && count < 67) {
                scope.setState({
                    counter: count + 1
                })
            } else if (count >= 67) {
                scope.setState({
                    page: 'Form'
                })
                clearInterval(interval);
            }
        }, 1000);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        //need to implement validation
        this.setState({
            page: 'Stripe'
        })

    }
    handleUrlChange(e) {
        var value = e.target.value;
        this.setState({
            url: value
        })
        e.preventDefault()
    }

    handleShorten(e) {
        this.setState({
            urlError: '',
            link: ''
        })
        e.preventDefault();
        var url = this.state.url;
        if (url.length === 0) {
            this.setState({
                urlError: 'A URL to shorten is required'
            })
        }
        const validUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if (!validUrl.test(url)) {
            this.setState({
                urlError: 'A valid URL is required'
            })
        }
        else {

            fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state),

            }).then(response => {
                response.json().then(data => {
                    var shorter = <a target='_blank' href={data.shortUrl}>{data.shortUrl}</a>
                    this.setState({
                        link: shorter
                    })
                })
            })

        }
    }


    render() {
        var page = "";
        switch (this.state.page) {
            case "Welcome":
                page = <Welcome handleClickTicket={this.handleClickTicket}/>;
                break;
            case "Now_serving":
                page = <Now_serving
                    count={this.state.counter}
                    startCount={this.startCount}
                />
                break;
            case "Form":
                page = <Form
                    handleFormSubmit={this.handleFormSubmit} />
                break;
            case "Stripe":
                page = <Stripe handlePayment={this.handlePayment}
                    />
                break;
        }

        switch (this.state.payment){
            case true:
                page = <UrlForm error={this.state.urlError} link={this.state.link} handleShorten={this.handleShorten} handleUrlChange={this.handleUrlChange} />
        }
        return (
            <div>
                {page}
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('app'))
