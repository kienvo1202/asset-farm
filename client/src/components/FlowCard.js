import React from 'react';

class FlowCard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { currentTime: new Date() };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  strROC() {
    {
      /* // rateofChange/grownth monthly +*/
    }
    if (this.props.cardType === 'Income') {
      return `+${this.formatNumber(this.props.roc)} VND/month`;
    }

    if (this.props.cardType === 'Expense') {
      return `-sum VND/month`;
    }

    if (this.props.cardType === 'Asset') {
      return `+${this.formatNumber(
        ((this.props.balance * this.props.meanGrowth) / 12).toFixed(0)
      )} VND/month`;
    }
  }

  strBalance() {
    if (this.props.cardType === 'Income') {
      return (
        <div>
          {`${this.formatNumber(
            (
              (this.props.roc / 30 / 84600000) *
              (new Date() - this.props.effectiveDate)
            ).toFixed(0)
          )} VND`}
        </div>
      );
    }

    if (this.props.cardType === 'Expense') {
      return <div>{`MTD sum VND`}</div>;
    }

    if (this.props.cardType === 'Asset') {
      return (
        <div>
          {`${this.formatNumber(this.props.balance)} + 
            ${this.formatNumber(
              (
                ((this.props.balance * this.props.meanGrowth) /
                  365 /
                  86400 /
                  1000) *
                (new Date() - this.props.startDate)
              ).toFixed(0)
            )} VND`}
        </div>
      );
    }
  }

  renderButtons() {
    if (this.props.cardType === 'Income') {
      return (
        <div
          className="extra content"
          onClick={() => this.props.fromOnChange(this.props.name)}
        >
          <div className="ui two buttons">
            <div className="ui basic green button">From</div>
            <div className="ui basic button"></div>
          </div>
        </div>
      );
    }

    if (this.props.cardType === 'Expense') {
      return (
        <div
          className="extra content"
          onClick={() => this.props.toOnChange(this.props.name)}
        >
          <div className="ui two buttons">
            <div className="ui basic button"></div>
            <div className="ui basic red button">To</div>
          </div>
        </div>
      );
    }

    if (this.props.cardType === 'Asset') {
      return (
        <div className="extra content">
          <div className="ui two buttons">
            <div
              className="ui basic red button"
              onClick={() => this.props.fromOnChange(this.props.name)}
            >
              From
            </div>
            <div
              className="ui basic green button"
              onClick={() => this.props.toOnChange(this.props.name)}
            >
              To
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="content">
          <div className="header">{this.props.name}</div>
          <div className="meta">{this.strROC()}</div>
          <div className="description">{this.strBalance()}</div>
        </div>
        {this.props.recordMode === true ? this.renderButtons() : ''}
      </div>
    );
  }
}

export default FlowCard;
