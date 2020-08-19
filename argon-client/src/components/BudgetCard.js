import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Row,
  Col,
  Modal,
  UncontrolledTooltip
} from 'reactstrap';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  fetchIOs,
  fetchAssets,
  fetchIncomeStatement,
  editIO,
  storeStatements,
  loadFormValues
} from '../actions';
import BudgetForm from './widgets/BudgetForm';

class BudgetCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [...Array(3).keys()]
    };
  }
  toggleModal = state => {
    // this.prepareBalanceSheet();
    this.setState({
      [state]: !this.state[state]
    });
  };

  budgetModal = account => {
    const initialProps = { budget: account.budget || 0 };
    return (
      <>
        <Button
          className="btn-icon btn-2"
          color="primary"
          type="button"
          size="sm"
          onClick={() => {
            this.props.loadFormValues(initialProps); //Initialized form here
            this.toggleModal(`budget${account._id}`);
          }}
        >
          <span className="btn-inner--icon m-0">
            <i className={`ni ni-settings`} size="sm" />
          </span>
        </Button>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state[`budget${account._id}`]}
          toggle={() => this.toggleModal(`budget${account._id}`)}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Set Budget</small>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggleModal(`budget${account._id}`)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div>{`${account.type} - ${account.name}`}</div>
                <div>{`Average: ${new Intl.NumberFormat('en-US').format(
                  _.round(
                    this.props.statements.io[account._id].average *
                      (this.props.ios[account._id].nativeDebitCredit ? 1 : -1),
                    -3
                  )
                )}`}</div>
                <BudgetForm
                  account={account}
                  onSubmitClose={() => this.toggleModal(`budget${account._id}`)}
                />
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  };

  budgetProgressBarRender = (id, budget, amount) => {
    const percentUsed = _.round((budget && amount / budget) * 100 || 0,0);
    const tooltipId = `budprog-${id}`;
    const barClass =
      percentUsed < 60
        ? 'bg-success'
        : percentUsed < 90
        ? 'bg-warning'
        : percentUsed < 110
        ? 'bg-danger'
        : 'bg-default';
    return (
      <>
        <Progress
          max="100"
          value={percentUsed}
          barClassName={barClass}
          id={tooltipId}
          style={{ width: '100%' }}
        />
        <UncontrolledTooltip delay={0} placement="bottom" target={tooltipId}>
          {percentUsed}%
        </UncontrolledTooltip>
      </>
    );
  };
  iosRowRender = ioName => {
    const data = Object.values(this.props.ios).filter(e => e.type === ioName);
    const flows = account => {
      if (_.isEmpty(this.props.statements.io)) return;

      const averageAmount = _.round(
        this.props.statements.io[account._id].average *
          (this.props.ios[account._id].nativeDebitCredit ? 1 : -1),
        -3
      );

      return (
        <>
          <td className="text-right">
            {new Intl.NumberFormat('en-US').format(_.round(account.budget || 0, -3))}{' '}
          </td>
          <td className="text-right">{new Intl.NumberFormat('en-US').format(averageAmount)}</td>

          {this.state.displayMonth.map(m => {
            const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
            const usedAmount =
              this.props.statements.io[account._id][d.getFullYear()][d.getMonth() + 1].net *
                (this.props.ios[account._id].nativeDebitCredit ? 1 : -1) +
              0;
            return (
              <td className="text-right">
                <div className="d-flex flex-column">
                  <span>{new Intl.NumberFormat('en-US').format(usedAmount)}</span>
                  {this.budgetProgressBarRender(
                    `${m}-${account._id}`,
                    this.props.ios[account._id].budget,
                    usedAmount
                  )}
                </div>
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
            <Row>
              <div className="col-10 pl-4 my-auto">{e.name}</div>
              <div className="col-2 p-0 text-right">{this.budgetModal(e)}</div>
            </Row>
          </td>
          {flows(e)}
        </tr>
      );
    });
    return rows;
  };

  render() {
    const budgetIncome = Object.values(this.props.ios).reduce(
      (a, c) => (c.type === 'income' ? a + (c.budget || 0) : a),
      0
    );
    const budgetExpense = Object.values(this.props.ios).reduce(
      (a, c) => (c.type === 'expense' ? a + (c.budget || 0) : a),
      0
    );

    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Budget</h3>
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
              <th scope="col" className="text-right">
                Budget
              </th>
              <th scope="col" className="text-right">
                Average
              </th>

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
              <td className="text-right font-weight-bold">{new Intl.NumberFormat('en-US').format(budgetIncome)}</td>
              <td className="text-right font-weight-bold">
                {!_.isEmpty(this.props.statements.io) &&
                  new Intl.NumberFormat('en-US').format(
                    -_.round(this.props.statements.io['income'].average, -3)
                  )}
              </td>

              {!_.isEmpty(this.props.statements.io) &&
                this.state.displayMonth.map(m => {
                  const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
                  const usedAmount =
                    -this.props.statements.io['income'][d.getFullYear()][d.getMonth() + 1]
                      .groupedTotal + 0;

                  return (
                    <td className="text-right font-weight-bold">
                      <div className="d-flex flex-column">
                        <span>{new Intl.NumberFormat('en-US').format(usedAmount)}</span>
                        {this.budgetProgressBarRender(`${m}-totalinc`, budgetIncome, usedAmount)}
                      </div>
                    </td>
                  );
                })}
            </tr>
            {this.iosRowRender('income')}
            <tr>
              <th scope="row">Total Expense</th>
              <td className="text-right font-weight-bold">{new Intl.NumberFormat('en-US').format(budgetExpense)}</td>
              <td className="text-right font-weight-bold">
                {!_.isEmpty(this.props.statements.io) &&
                  new Intl.NumberFormat('en-US').format(
                    _.round(this.props.statements.io['expense'].average, -3)
                  )}
              </td>

              {!_.isEmpty(this.props.statements.io) &&
                this.state.displayMonth.map(m => {
                  const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
                  const usedAmount = this.props.statements.io['expense'][d.getFullYear()][
                    d.getMonth() + 1
                  ].groupedTotal;
                  return (
                    <td className="text-right font-weight-bold">
                      <div className="d-flex flex-column">
                        <span>{new Intl.NumberFormat('en-US').format(usedAmount)}</span>
                        {this.budgetProgressBarRender(`${m}-totalexp`, budgetExpense, usedAmount)}
                      </div>
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
  editIO,
  storeStatements,
  loadFormValues
})(BudgetCard);
