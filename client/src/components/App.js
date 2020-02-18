import React from 'react';
import RecordForm from './RecordForm';
import Incomes from './Incomes';
import Expenses from './Expenses';
import Assets from './Assets';
import Transactions from './Transactions';
import Chart from './Chart';
import data from './data.json';
import axios from 'axios';
import getChartData from './getChartData';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recordMode: false,
      currentTime: new Date(),
      amount: null,
      from: '',
      to: '',
      chartData: [],
      incomeCards: [],
      expenseCards: [],
      assetCards: [],
      transactions: []
    };

    console.log(this.state);
    this.getCards();
  }

  changeRecordMode = () => {
    this.setState({ recordMode: !this.state.recordMode });
    console.log(new Date(data[0].income[0].effectiveDate));
  };
  amountOnChange = event => {
    this.setState({ amount: event.target.value });
  };
  fromOnChange = name => {
    try {
      this.setState({ from: name.target.value });
    } catch {
      this.setState({ from: name });
    }
  };
  toOnChange = name => {
    try {
      this.setState({ to: name.target.value });
    } catch {
      this.setState({ to: name });
    }
  };

  onRecord = () => {
    axios.post('/api/v1/transactions', {
      farm: '5de608e532c37a25186e3931',
      from: this.state.from,
      to: this.state.to,
      amount: this.state.amount
    });
  };

  getChartDataToState = async () => {
    const chartData = await getChartData();
    this.setState({ chartData });
    console.log(this.state);
  };
  async getCards() {
    const incomeCards = await axios.get('/api/v1/cards?card=income');
    const expenseCards = await axios.get('/api/v1/cards?card=expense');
    const assetCards = await axios.get('/api/v1/cards?card=asset');
    const transactions = await axios.get('/api/v1/transactions');

    this.setState({
      incomeCards: incomeCards.data.data.docs,
      expenseCards: expenseCards.data.data.docs,
      assetCards: assetCards.data.data.docs,
      transactions: transactions.data.data.docs
    });
    // console.log(this.state);
  }

  //making running roc numbers
  updateTime = () => {
    this.setState({ currentTime: new Date() });
  };
  componentDidMount() {
    this.interval = setInterval(this.updateTime, 200);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  //--------------------------------

  render() {
    return (
      <div className="ui container">
        <h1>Asset Farm</h1>
        <div className="ui two column stackable grid">
          <div className="column">
            <RecordForm
              recordMode={this.state.recordMode}
              changeRecordMode={this.changeRecordMode}
              amount={this.state.amount}
              from={this.state.from}
              to={this.state.to}
              amountOnChange={this.amountOnChange}
              fromOnChange={this.fromOnChange}
              toOnChange={this.toOnChange}
              onRecord={this.onRecord}
              fromValues={this.state.incomeCards.concat(this.state.assetCards)}
              toValues={this.state.expenseCards.concat(this.state.assetCards)}
            />
          </div>
          <div className="column">
            <div
              className="ui stacked segment"
              style={{ overflow: 'auto', maxHeight: 400 }}
            >
              <Transactions data={this.state.transactions} />
            </div>
          </div>
        </div>
        <div className="ui three column stackable grid">
          {/* style={{ paddingTop: '10em' }} */}
          <div className="three wide column">
            <Incomes
              data={this.state.incomeCards}
              recordMode={this.state.recordMode}
              fromOnChange={this.fromOnChange}
              toOnChange={this.toOnChange}
            />
          </div>
          <div className="six wide column">
            <Expenses
              data={this.state.expenseCards}
              recordMode={this.state.recordMode}
              fromOnChange={this.fromOnChange}
              toOnChange={this.toOnChange}
            />
          </div>
          <div className="six wide column">
            <Assets
              data={this.state.assetCards}
              recordMode={this.state.recordMode}
              fromOnChange={this.fromOnChange}
              toOnChange={this.toOnChange}
            />
          </div>
        </div>
        {/* Chart */}
        <Chart
          getChartDataToState={this.getChartDataToState}
          data={this.state.chartData}
          size={[500, 500]}
        />
      </div>
    );
  }
}

export default App;
