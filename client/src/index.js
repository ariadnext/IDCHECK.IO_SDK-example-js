import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import Results from './pages/Results';
import ErrorPage from './pages/Error';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/results" component={Results}/>
            <Route path="/error" component={ErrorPage}/>
        </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
