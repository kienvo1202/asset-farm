import React from 'react';
import FlowCard from './FlowCard';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const expenseCardsRendered = this.props.data.map(element => {
      return (
        <FlowCard
          cardType="Expense"
          name={element.name}
          effectiveDate={new Date(element.effectiveDate)}
          recordMode={this.props.recordMode}
          fromOnChange={this.props.fromOnChange}
          toOnChange={this.props.toOnChange}
        />
      );
    });

    return (
      <div>
        <h2>Expense</h2>
        <div className="ui two cards">{expenseCardsRendered}</div>
      </div>
    );
  }
}

export default Expenses;
