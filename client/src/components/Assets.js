import React from 'react';
import FlowCard from './FlowCard';
import _ from 'lodash';

class Assets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const assetCardsRendered = this.props.data.map(element => {
      return (
        <FlowCard
          cardType="Asset"
          name={`${_.startCase(element.type)} - ${element.name}`}
          balance={element.balance}
          meanGrowth={element.meanGrowth}
          startDate={element.effectiveDate}
          term={element.term}
          termUnit={element.termUnit}
          recordMode={this.props.recordMode}
          fromOnChange={this.props.fromOnChange}
          toOnChange={this.props.toOnChange}
        />
      );
    });

    return (
      <div>
        <h2>Assets</h2>
        <div className="ui two cards">{assetCardsRendered}</div>
      </div>
    );
  }
}

export default Assets;
