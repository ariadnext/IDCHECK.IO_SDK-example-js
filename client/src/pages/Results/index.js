import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import DocumentResults from './components/DocumentResults';
import CheckReport from './components/CheckReport';
import DocumentThumbnail from './components/DocumentThumbnail';
import './style.css';

function Results({ location: { search } }) {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { fileUid } = queryString.parse(search);
    axios
      .get(`/api/results/${fileUid}`)
      .then(({ data }) => {
        setResults(data);
      })
      .catch(error => {
        setError(error);
      });
  }, [search]);

  return (
    <div>
      {!results && !error && <div>Loading...</div>}
      {error && (
        <div style={{ color: 'red' }}>Error. Cannot retrieve data.</div>
      )}
      {results && (
        <div className="results-container">
          <div className="results-documents-container">
            <div>
              <div className="results-thumbnails">
                {results.documents.map(document => (
                  <DocumentThumbnail
                    key={`document-thumbnail-${document.uid}`}
                    document={document}
                  />
                ))}
              </div>
              <div>
                <DocumentResults documents={results.documents} />
              </div>
            </div>
          </div>
          <div className="check-report-container">
            <CheckReport report={results.report} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
