import React, {Component} from 'react';
import './style.css';

const DocumentProperty = ({data}) => (
    <div className="document-property">
        <label>{data.label} :</label>
        {data.value && !data.valueLabel && <span>{data.value}</span>}
        {data.values && <span>{data.values.join(' ')}</span>}
        {data.valueLabel && <span>{data.valueLabel}</span>}
    </div>
);

class DocumentResults extends Component {

    render() {
        const {documents} = this.props;
        return (
            <div className="results-document">
                <div>
                    <h3>Document</h3>
                    {documents.map(document => (
                        <div key={`results-document-${document.uid}-info`}>
                            {document.lastReport && document.lastReport.info &&
                            <div>
                                <DocumentProperty data={document.lastReport.info.documentNumber}/>
                                <DocumentProperty data={document.lastReport.info.expirationDate}/>
                            </div>
                            }
                            {document.lastReport.issuance &&
                            <div>
                                <DocumentProperty data={document.lastReport.issuance.issueDate}/>
                                <DocumentProperty data={document.lastReport.issuance.issuingCountry}/>
                                <DocumentProperty data={document.lastReport.issuance.issuingAuthority}/>
                            </div>
                            }
                        </div>
                    ))}
                </div>
                {documents.map(document => (
                    <div key={`results-document-${document.uid}-persons`}>
                        {document.lastReport && document.lastReport.persons && document.lastReport.persons.map((person, index) => (
                            <div key={`results-document-${document.uid}-person-${index}`} className="results-person">
                                <h3>Identité</h3>
                                <DocumentProperty data={person.identityData.lastName}/>
                                <DocumentProperty data={person.identityData.firstNames}/>
                                <DocumentProperty data={person.identityData.birthDate}/>
                                <DocumentProperty data={person.identityData.birthPlace}/>
                                <DocumentProperty data={person.identityData.gender}/>
                                <DocumentProperty data={person.identityData.nationality}/>
                                <DocumentProperty data={person.addressData.lines}/>
                                <DocumentProperty data={person.addressData.city}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

}

export default DocumentResults;
