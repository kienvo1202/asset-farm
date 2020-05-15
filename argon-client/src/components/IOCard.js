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
import {
  fetchTransactions,
  fetchIOs,
  fetchAssets,
  fetchIncomeStatement,
  storeStatements
} from '../actions';

class IOCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4, 5, 6],
      period: 6
    };
  }
  async componentDidMount() {
    await this.props.fetchIOs(this.props.currentFarm);
    //await this.props.fetchAssets(this.props.currentFarm);
    await this.props.fetchIncomeStatement(this.props.currentFarm);
    this.standardizeIncomeStatement();
  }

  setPeriod = () => {
    const displayMonth = [...Array(this.state.period).keys()].map(period => {
      const d = new Date(new Date().getFullYear(), new Date().getMonth() - period, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    });
    //this.setState({displayMonth})
  };

  standardizeIncomeStatement = async () => {
    const statement = {};
    //const flatStatement =  await axios.get(`/api/v1/transactions/ios?farm=${this.props.currentFarm}`) //this.props.incomeStatement.raw;
    const rawStatement = this.props.statements.raw.reduce((c, v) => {
      const a = v.account;
      const y = v.year;
      const m = v.month;
      c[a] = c[a] || {};
      c[a][y] = c[a][y] || {};
      c[a][y][m] = c[a][y][m] || {};
      c[a][y][m].totalDebit = c[a][y][m].totalDebit || v.totalDebit || 0;
      c[a][y][m].totalCredit = c[a][y][m].totalCredit || v.totalCredit || 0;
      c[a][y][m].net = c[a][y][m].totalDebit - c[a][y][m].totalCredit;
      return c;
    }, {});

    const data = Object.values(this.props.ios);
    data.map(account => {
      //!_.isEmpty(this.props.statements) &&
      this.state.displayMonth.map(month => {
        const d = new Date(new Date().getFullYear(), new Date().getMonth() - month, 1);
        const a = account._id;
        const y = d.getFullYear();
        const m = d.getMonth() + 1;

        // let debit = 0;
        // let credit = 0;
        // if (rawStatement[a][y]) {
        //   if (rawStatement[a][y][m]) {
        //     debit = rawStatement[a][y][m].totalDebit || 0;
        //     credit = rawStatement[a][y][m].totalCredit || 0;
        //   }
        // }
        const net = rawStatement[a][y]
          ? rawStatement[a][y][m]
            ? rawStatement[a][y][m].net || 0
            : 0
          : 0;
        //debit - credit;
        statement[a] = statement[a] || {};
        statement[a][y] = statement[a][y] || {};
        statement[a][y][m] = statement[a][y][m] || {};
        statement[a][y][m].net = net || 0;
        //for item average
        statement[a].total = (statement[a].total || 0) + net;
        //calculating account monthly Grouped IO totals
        statement[account.type] = statement[account.type] || {};
        statement[account.type][y] = statement[account.type][y] || {};
        statement[account.type][y][m] = statement[account.type][y][m] || {};
        statement[account.type][y][m].groupedTotal =
          (statement[account.type][y][m].groupedTotal || 0) + net;
        //for grouped average
        statement[account.type].total = (statement[account.type].total || 0) + net;
      });
    });

    this.props.storeStatements({name:'io',statement:statement});
  };

  iosRowRender = ioName => {
    const data = Object.values(this.props.ios).filter(e => e.type === ioName);
    const flows = (account) => {
      if (_.isEmpty(this.props.statements.io)) return
      
      return (
        <>
        <td className="text-right">
            {new Intl.NumberFormat('en-US').format(
                _.round(
                  this.props.statements.io[account._id].total * (this.props.ios[account._id].nativeDebitCredit ? 1 : -1) /
                    this.state.displayMonth.filter(e => e > 0).length + 0,
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
                    this.props.statements.io[account._id][d.getFullYear()][
                      d.getMonth() + 1
                    ].net * (this.props.ios[account._id].nativeDebitCredit ? 1 : -1) + 0
                  )}
                </td>
              );
            })}
      
      </>)

    }
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
              <th scope="col">Average</th>
              <th scope="col">Budget</th>
              {this.state.displayMonth.map(e => {
                return (
                  <th scope="col">
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
              <td>
                {!_.isEmpty(this.props.statements.io) &&
                  new Intl.NumberFormat('en-US').format(
                    - _.round(
                      this.props.statements.io['income'].total /
                        this.state.displayMonth.filter(e => e > 0).length + 0,
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
                        -this.props.statements.io['income'][d.getFullYear()][
                          d.getMonth() + 1
                        ].groupedTotal + 0
                      )}
                    </td>
                  );
                })}
            </tr>
            {this.iosRowRender('income')}
            <tr>
              <th scope="row">Total Expense</th>
              <td>
                {!_.isEmpty(this.props.statements.io) &&
                  new Intl.NumberFormat('en-US').format(
                    _.round(
                      this.props.statements.io['expense'].total /
                        this.state.displayMonth.filter(e => e > 0).length,
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
                        this.props.statements.io['expense'][d.getFullYear()][
                          d.getMonth() + 1
                        ].groupedTotal
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
  fetchTransactions,
  fetchIOs,
  fetchAssets,
  fetchIncomeStatement,
  storeStatements
})(IOCard);
