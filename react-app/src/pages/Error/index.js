import React, { Component } from 'react';
import ErrorImage from './error.svg';
import './style.css';

class ErrorPage extends Component {

    constructor(props) {
        super(props);
        this.restart = this.restart.bind(this);
    }

    restart() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="error-page">
                <img src={ErrorImage} alt="Error" />
                <div className="error-message">
                    Something went wrong.
                </div>
                <div className="error-restart-button">
                    <button onClick={this.restart}>Restart</button>
                </div>
            </div>
        );
    }

}

export default ErrorPage;