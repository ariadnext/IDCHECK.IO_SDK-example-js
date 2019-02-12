import React, {Component} from 'react';
import axios from 'axios';
import MailImage from './mailbox.svg';
import AlertImage from './alert.svg';
import './style.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {link: null, error: null};
    }

    componentDidMount() {
        axios.get('/api/start').then(({data}) => {
            this.setState({link: data});
        }).catch((error) => {
            this.setState({error: error});
        });
    }

    render() {
        return (
            <div className="home-container">
                {this.state.error &&
                <div className="state-error">
                    <img src={AlertImage} alt="Error" />
                    <p>Cannot create link.</p>
                </div>
                }
                {this.state.link && this.state.link.email &&
                <div className="state-mailbox">
                    <img src={MailImage} alt="mailbox"/>
                    <p>The link has been sent by mail.</p>
                </div>
                }
                {this.state.link && !this.state.link.email && <iframe
                    title="sdk-web"
                    src={this.state.link.url}
                    sandbox="allow-scripts allow-same-origin  allow-top-navigation allow-modals allow-popups"
                    allow="camera *; microphone* ;"
                    style={{width: '100%', height: '100vh', border: 'none'}}
                />}
            </div>
        );
    }

}

export default Home;
