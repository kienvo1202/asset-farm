import React from 'react';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const transactionsRender = this.props.data.map(e => {
      return (
        <div className="ui row">
          <div className="ui column">{e.description}</div>
          <div className="ui column">{e.from}</div>
          <div className="ui column">{e.to}</div>
          <div className="ui column">{e.amount}</div>
        </div>
      );
    });
    return (
      <div>
        <h3>Transactions</h3>
        <div className="ui stackable four column vertically divided grid container">
          <div className="ui row">
            <div className="ui column">Description</div>
            <div className="ui column">From</div>
            <div className="ui column">To</div>
            <div className="ui column">Amount</div>
          </div>
          {transactionsRender}
        </div>
      </div>
    );
  }
}

export default Transactions;
