import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {link: null, error: null};
    }

    componentDidMount() {
        axios.get('/start').then(({data}) => {
            this.setState({link: data});
        }).catch((error) => {
            this.setState({error: error});
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.error && <div style={{color: 'red'}}>
                    <p>Cannot create link.</p>
                </div>}
                {this.state.link && this.state.link.email && <div>
                    The link has been sent by mail.
                </div>}
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

export default App;
