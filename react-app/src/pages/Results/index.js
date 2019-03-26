import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string'
import DocumentResults from './components/DocumentResults';
import CheckReport from './components/CheckReport';
import DocumentThumbnail from './components/DocumentThumbnail';
import './style.css';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {results: null, error: null};
    }

    componentDidMount() {
        const {location: {search}} = this.props;
        const {fileUid} = queryString.parse(search);
        axios.get(`/api/results/${fileUid}`).then(({data}) => {
            this.setState({results: data});
        }).catch((error) => {
            this.setState({error: error});
        });
    }

    render() {
        return (
            <div>
                {!this.state.results && !this.state.error &&
                <div>Loading...</div>
                }
                {this.state.error &&
                <div style={{color: 'red'}}>
                    Error. Cannot retrieve data.
                </div>
                }
                {this.state.results &&
                <div className="results-container">
                    <div className="results-documents-container">
                        <div>
                            <div className="results-thumbnails">
                                {this.state.results.documents.map(document => (
                                    <DocumentThumbnail
                                        key={`document-thumbnail-${document.uid}`}
                                        document={document}
                                    />
                                ))}
                            </div>
                            <div>
                                <DocumentResults documents={this.state.results.documents}/>
                            </div>
                        </div>
                    </div>
                    <div className="check-report-container">
                        <CheckReport report={this.state.results.report}/>
                    </div>
                </div>
                }
            </div>
        );
    }

}

export default Results;