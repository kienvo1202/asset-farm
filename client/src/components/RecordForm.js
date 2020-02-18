import React from 'react';
import _ from 'lodash';
// import './RecordForm.css';

class RecordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  renderForm() {
    const fromRendered = this.props.fromValues.map(ele => {
      const part1 = `${_.startCase(ele.type)} - ${ele.name}`;
      const name = !ele.type ? ele.name : part1;

      return <option value={name}>{name}</option>;
    });

    const toRendered = this.props.toValues.map(ele => {
      const part1 = `${_.startCase(ele.type)} - ${ele.name}`;
      const name = !ele.type ? ele.name : part1;

      return <option value={name}>{name}</option>;
    });

    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="ui form">
          {/* <div className="three fields"> */}
          <div className="field">
            <label>Amount</label>
            <div className="ui right labeled input">
              <label for="amount" className="ui label">
                VND
              </label>
              <input
                type="number"
                placeholder="Amount"
                value={this.props.amount}
                onChange={event => this.props.amountOnChange(event)}
              />
              <div className="ui basic label">000</div>
            </div>
          </div>
          <div className="field">
            <label>From</label>
            <select
              className="ui dropdown"
              value={this.props.from}
              onChange={event => this.props.fromOnChange(event)}
            >
              <option value=""></option>
              {fromRendered}
            </select>
          </div>
          <div className="field">
            <label>To</label>
            <select
              className="ui fluid dropdown"
              value={this.props.to}
              onChange={event => this.props.toOnChange(event)}
            >
              <option value=""></option>
              {toRendered}
            </select>
          </div>
        </form>
        <button className="ui primary button" onClick={this.props.onRecord}>
          Record
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="ui raised segment">
        <button onClick={this.props.changeRecordMode} className="ui button">
          Record Mode
        </button>
        {/* style={{ position: 'fixed' }} */}

        {this.props.recordMode === true ? this.renderForm() : ''}
      </div>
    );
  }
}

export default RecordForm;
