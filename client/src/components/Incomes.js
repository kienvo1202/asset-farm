import React from 'react';
import FlowCard from './FlowCard';

class Incomes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const incomeCardsRendered = this.props.data.map(element => {
      return (
        <FlowCard
          cardType="Income"
          name={element.name}
          roc={element.roc}
          effectiveDate={new Date(element.effectiveDate)}
          recordMode={this.props.recordMode}
          fromOnChange={this.props.fromOnChange}
          toOnChange={this.props.toOnChange}
        />
      );
    });

    return (
      <div>
        <h2>Income</h2>
        <div className="ui one cards">{incomeCardsRendered}</div>
      </div>
    );
  }
}

export default Incomes;
