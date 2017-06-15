import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import Now_serving from './components/Now_serving';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWelcomePage: true,
            isNow_servingPage: false,
            isApplicationFormPage: false,
            isStripePage: false,
            counter: 65
        };
        this.handleClickTicket = this.handleClickTicket.bind(this);
        this.startCount = this.startCount.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleClickTicket(e) {
        e.preventDefault();
        this.setState({
            isWelcomePage: false,
            isNow_servingPage: true,
            isApplicationFormPage: false,
            isStripePage: false
        })

        this.startCount();
    }

    startCount() {
        var scope = this;
        var interval = setInterval(function (xyz) {
            var now_serving = scope.state.isNow_servingPage;
            var count = scope.state.counter;
            if (now_serving && count < 67) {
                scope.setState({
                    counter: count + 1
                })
            } else if (count >= 67) {
                scope.setState({
                    isWelcomePage: false,
                    isNow_servingPage: false,
                    isApplicationFormPage: true,
                    isStripePage: false,
                })
                clearInterval(interval);
            }
        }, 10000);
    }

    handleFormSubmit(e){
        e.preventDefault();
        
    }
    render() {
        return (
            <div>
                {this.state.isWelcomePage ?
                    <Welcome handleClickTicket={this.handleClickTicket} /> : null}
                {this.state.isNow_servingPage && <Now_serving
                    count={this.state.counter}
                    startCount={this.startCount}
                />}
                {this.state.isApplicationFormPage ? <Form 
               handleFormSubmit = {this.handleFormSubmit}/> : null}
               
            </div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
