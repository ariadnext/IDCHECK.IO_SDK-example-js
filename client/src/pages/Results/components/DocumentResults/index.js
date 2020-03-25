import React from 'react';
import './style.css';

const DocumentProperty = ({ data }) =>
  data ? (
    <div className="document-property">
      <label>{data.label} :</label>
      {data.value && !data.valueLabel && <span>{data.value}</span>}
      {data.values && <span>{data.values.join(' ')}</span>}
      {data.valueLabel && <span>{data.valueLabel}</span>}
    </div>
  ) : null;

function DocumentResults({ documents }) {
  return (
    <div className="results-document">
      <div>
        <h3>Document</h3>
        {documents.map(({ uid, lastReport }) => (
          <div key={`results-document-${uid}-info`}>
            {lastReport && lastReport.info && (
              <div>
                <DocumentProperty data={lastReport.info.documentNumber} />
                <DocumentProperty data={lastReport.info.expirationDate} />
              </div>
            )}
            {lastReport.issuance && (
              <div>
                <DocumentProperty data={lastReport.issuance.issueDate} />
                <DocumentProperty data={lastReport.issuance.issuingCountry} />
                <DocumentProperty data={lastReport.issuance.issuingAuthority} />
              </div>
            )}
          </div>
        ))}
      </div>

      {documents.map(document => (
        <div key={`results-document-${document.uid}-persons`}>
          {document.type !== 'LIVENESS' &&
            document.lastReport &&
            document.lastReport.persons &&
            document.lastReport.persons.map((person, index) => (
              <div
                key={`results-document-${document.uid}-person-${index}`}
                className="results-person"
              >
                {person.identityData && (
                  <>
                    <h3>Identity</h3>
                    <DocumentProperty data={person.identityData.lastName} />
                    <DocumentProperty data={person.identityData.firstNames} />
                    <DocumentProperty data={person.identityData.birthDate} />
                    <DocumentProperty data={person.identityData.birthPlace} />
                    <DocumentProperty data={person.identityData.gender} />
                    <DocumentProperty data={person.identityData.nationality} />
                  </>
                )}
                {person.addressData && (
                  <>
                    <DocumentProperty data={person.addressData.lines} />
                    <DocumentProperty data={person.addressData.city} />
                  </>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default DocumentResults;
