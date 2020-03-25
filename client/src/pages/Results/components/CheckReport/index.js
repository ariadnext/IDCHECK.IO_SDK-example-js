import React, { useState } from 'react';
import './style.css';

const CheckStatusLabel = ({ status }) => (
  <span style={{ color: status === 'OK' ? 'green' : 'red' }}>{status}</span>
);

const CheckReportItem = ({ check, expanded }) => (
  <li className="check-report-item">
    <p>
      <CheckStatusLabel status={check.status} /> {check.message}
    </p>
    {check.subChecks &&
      check.subChecks.map(subcheck => (
        <ul
          key={`check-report-item-${subcheck.documentUid}-${subcheck.identifier}`}
          style={{ display: expanded ? 'block' : 'none' }}
        >
          <CheckReportItem check={subcheck} expanded={expanded} />
        </ul>
      ))}
  </li>
);

function CheckReport({ report }) {
  const [expanded, setExpanded] = useState(null);

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="check-report">
      <div className="check-report-toolbar">
        <button onClick={toggleCollapse}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <h3>Résultats</h3>
      <ul>
        {report.checks.map(check => (
          <CheckReportItem
            key={`check-report-item-${check.documentUid}-${check.identifier}`}
            check={check}
            expanded={expanded}
          />
        ))}
      </ul>
    </div>
  );
}

export default CheckReport;
