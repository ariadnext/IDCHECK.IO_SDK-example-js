import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import IdCheckIo from 'idcheckio-sdk';
import MailImage from './mailbox.svg';
import AlertImage from './alert.svg';
import './style.css';

const idcheck = new IdCheckIo({
  mode: 'DOM',
  forceMobileLayout: true,
});
idcheck.on('DOCUMENT_CAPTURED', () => console.log('Document captured'));

function Home() {
  const idcheckRef = useRef(null);
  const [onboarding, setOnboarding] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/start')
      .then(({ data }) => {
        setOnboarding(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (onboarding) {
      idcheck.init({
        url: onboarding.url,
        element: idcheckRef.current, // Alternative: "#idcheck-component",
      });
    }
  }, [onboarding]);

  return (
    <div className="home-container">
      {error && (
        <div className="state-error">
          <img src={AlertImage} alt="Error" />
          <p>Cannot create onboarding.</p>
        </div>
      )}
      {onboarding && onboarding.email && (
        <div className="state-mailbox">
          <img src={MailImage} alt="mailbox" />
          <p>The link has been sent by mail.</p>
        </div>
      )}
      <div id="idcheck-component" ref={idcheckRef}>
        Loading...
      </div>
    </div>
  );
}

export default Home;
