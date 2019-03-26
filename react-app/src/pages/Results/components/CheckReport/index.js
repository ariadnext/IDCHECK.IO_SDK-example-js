import React, { Component } from 'react';
import './style.css';

const CheckStatusLabel = ({ status }) => (
  <span style={{ color: status === 'OK' ? 'green' : 'red' }}>
      {status}
  </span>
);

const CheckReportItem = ({ check, expanded }) => (
    <li className="check-report-item">
        <p><CheckStatusLabel status={check.status} /> {check.message}</p>
        {check.subChecks && check.subChecks.map(subcheck => (
            <ul
                key={`check-report-item-${subcheck.documentUid}-${subcheck.identifier}`}
                style={{ display: expanded ? 'block' : 'none' }}>
                <CheckReportItem check={subcheck} expanded={expanded} />
            </ul>
        ))}
    </li>
);

class CheckReport extends Component {

    constructor(props) {
        super(props);
        this.state = { expanded: false };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const { report } = this.props;
        return (
            <div className="check-report">
                <div className="check-report-toolbar">
                    <button onClick={this.toggleCollapse}>
                        {this.state.expanded ? 'Collapse' : 'Expand' }
                    </button>
                </div>
                <h3>Résultats</h3>
                <ul>
                    {report.checks.map(check => (
                        <CheckReportItem
                            key={`check-report-item-${check.documentUid}-${check.identifier}`}
                            check={check}
                            expanded={this.state.expanded}
                        />
                    ))}
                </ul>
            </div>
        );
    }

}

export default CheckReport;
