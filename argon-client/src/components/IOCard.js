import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input
} from 'reactstrap';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchIOs, fetchAssets, fetchIncomeStatement, storeStatements } from '../actions';

class IOCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4, 5, 6],
      period: 6
    };
  }
  async componentDidMount() {
    // await this.props.fetchIOs(this.props.currentFarm);
    // await this.props.fetchIncomeStatement(this.props.currentFarm);
    this.calculateIncomeStatement();
  }

  calculateMonthlyNetFlow = (account, flatStatement, date) => {
    const res = {}
    const subset = flatStatement.filter(
      e => e.account === account._id && e.month === date.getMonth() + 1 && e.year === date.getFullYear()
    );
    res.totalDebit = subset[0] ? subset[0].totalDebit || 0 : 0
    res.totalCredit = subset[0] ? subset[0].totalCredit || 0 : 0
    res.net = res.totalDebit - res.totalCredit
    return res
  };

  //get months with decent transactions for averaging 
  calculateSignificantMonths = async () => {
    const countMonthlyTransaction = await axios.get(
      `/api/v1/transactions/stats/monthlyTransactions?farm=${this.props.currentFarm}`
    );

    const countDistribution = countMonthlyTransaction.data.data
      .filter(e => new Date(e._id) <= new Date())
      .map(e => e.countTransaction);

    //Math calculations for mean,std
    const n = countDistribution.length;
    const mean = countDistribution.reduce((a, b) => a + b) / n;
    const s = Math.sqrt(
      countDistribution.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );

    const res = countMonthlyTransaction.data.data
      .filter(e => e.countTransaction >= mean - s)
      .map(e => e._id)
      .slice(0,6); //last 12 motnhs
    
    return res;
  };

  calculateAverageFlow= async (account, flatStatement,months ) => {
    const res = _.mean(months.map(m => this.calculateMonthlyNetFlow(account, flatStatement, new Date(m)).net))
    return res
  }

  calculateIncomeStatement = async () => {
    const statement = {};
    const months = await this.calculateSignificantMonths()

    //Transform into Nested object: accountId - year - month - {}, has all months
    // const rawStatement = this.props.statements.raw.reduce((c, v) => {
    //   const a = v.account;
    //   const y = v.year;
    //   const m = v.month;
    //   c[a] = c[a] || {};
    //   c[a][y] = c[a][y] || {};
    //   c[a][y][m] = c[a][y][m] || {};
    //   c[a][y][m].totalDebit = c[a][y][m].totalDebit || v.totalDebit || 0;
    //   c[a][y][m].totalCredit = c[a][y][m].totalCredit || v.totalCredit || 0;
    //   c[a][y][m].net = c[a][y][m].totalDebit - c[a][y][m].totalCredit;
    //   return c;
    // });
    // console.log('rawStatementIO', rawStatement);

    //----------------------------------------
    //Prepare monthly net flow and Complete objects with 0 flow in certain months
    const data = Object.values(this.props.ios);
    data.map(async (account) => {
      const a = account._id;
      //!_.isEmpty(this.props.statements) &&
      this.state.displayMonth.map(month => {
        const d = new Date(new Date().getFullYear(), new Date().getMonth() - month, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;

        const net = this.calculateMonthlyNetFlow(account,this.props.statements.raw,d).net

        //prepare statement
        statement[a] = statement[a] || {};
        statement[a][y] = statement[a][y] || {};
        statement[a][y][m] = statement[a][y][m] || {};
        statement[a][y][m].net = net || 0;
        //for item average
        // statement[a].total = (statement[a].total || 0) + net;
        //calculating account monthly Grouped IO totals
        statement[account.type] = statement[account.type] || {};
        statement[account.type][y] = statement[account.type][y] || {};
        statement[account.type][y][m] = statement[account.type][y][m] || {};
        statement[account.type][y][m].groupedTotal =
          (statement[account.type][y][m].groupedTotal || 0) + net;
        //for grouped average
        // statement[account.type].total = (statement[account.type].total || 0) + net;
      });

      //for averages
      
      statement[a].average = _.mean(months.map(m => this.calculateMonthlyNetFlow(account, this.props.statements.raw, new Date(m)).net))
      statement[account.type].average = (statement[account.type].average || 0) + statement[a].average;
      
    });
    this.props.storeStatements({ name: 'io', statement: statement });
  };

  iosRowRender = ioName => {
    
    const data = Object.values(this.props.ios).filter(e => e.type === ioName);
    const flows = account => {
      if (_.isEmpty(this.props.statements.io)) return;
      return (
        <>
          <td className="text-right">
            {new Intl.NumberFormat('en-US').format(
              _.round(
                (this.props.statements.io[account._id].average *
                  (this.props.ios[account._id].nativeDebitCredit ? 1 : -1)),
                -3
              )
            )}
          </td>
          <td>budget</td>
          {this.state.displayMonth.map(m => {
            const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
            return (
              <td className="text-right">
                {new Intl.NumberFormat('en-US').format(
                  this.props.statements.io[account._id][d.getFullYear()][d.getMonth() + 1].net *
                    (this.props.ios[account._id].nativeDebitCredit ? 1 : -1) +
                    0
                )}
              </td>
            );
          })}
        </>
      );
    };
    const rows = data.map(e => {
      return (
        <tr>
          <td>
            <div className="pl-4">{e.name}</div>
          </td>
          {flows(e)}
        </tr>
      );
    });
    return rows;
  };

  render() {
    console.log(this.props.statements.io)
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Income & Expense</h3>
            </div>
            <div className="col text-right">
              <span>Net earnings</span>
              <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                See all
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive size="sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">Items</th>
              <th scope="col" className="text-right">Average</th>
              <th scope="col" className="text-right">Budget</th>
              {this.state.displayMonth.map(e => {
                return (
                  <th className="text-right" scope="col">
                    {new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() - e,
                      1
                    ).toLocaleString('default', { month: 'short', year: '2-digit' })}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Total Income</th>
              <td className="text-right"> 
                {!_.isEmpty(this.props.statements.io) &&
                  new Intl.NumberFormat('en-US').format(
                    -_.round(
                      this.props.statements.io['income'].average,
                      -3
                    )
                  )}
              </td>
              <td>40,569</td>
              {!_.isEmpty(this.props.statements.io) &&
                this.state.displayMonth.map(m => {
                  const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
                  return (
                    <td className="text-right">
                      {new Intl.NumberFormat('en-US').format(
                        -this.props.statements.io['income'][d.getFullYear()][d.getMonth() + 1]
                          .groupedTotal + 0
                      )}
                    </td>
                  );
                })}
            </tr>
            {this.iosRowRender('income')}
            <tr>
              <th scope="row">Total Expense</th>
              <td className="text-right">
                {!_.isEmpty(this.props.statements.io) &&
                  new Intl.NumberFormat('en-US').format(
                    _.round(
                      this.props.statements.io['expense'].average,
                      -3
                    )
                  )}
              </td>
              <td>294</td>
              {!_.isEmpty(this.props.statements.io) &&
                this.state.displayMonth.map(m => {
                  const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
                  return (
                    <td className="text-right">
                      {new Intl.NumberFormat('en-US').format(
                        this.props.statements.io['expense'][d.getFullYear()][d.getMonth() + 1]
                          .groupedTotal
                      )}
                    </td>
                  );
                })}
            </tr>
            {this.iosRowRender('expense')}
          </tbody>
        </Table>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    ios: state.ios,
    assets: state.assets,
    transactions: state.transactions,
    statements: state.statements,
    currentFarm: state.currentFarm
  };
};

export default connect(mapStateToProps, {
  fetchIOs,
  fetchAssets,
  fetchIncomeStatement,
  storeStatements
})(IOCard);
