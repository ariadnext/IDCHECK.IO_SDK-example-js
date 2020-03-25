import React from 'react';
import ErrorImage from './error.svg';
import './style.css';

function ErrorPage({ history }) {
  const restart = () => {
    history.push('/');
  };
  return (
    <div className="error-page">
      <img src={ErrorImage} alt="Error" />
      <div className="error-message">Something went wrong.</div>
      <div className="error-restart-button">
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default ErrorPage;
