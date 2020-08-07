import React from 'react';
import { Button, Card, CardHeader, CardBody, Table, Row, Modal, Label } from 'reactstrap';

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import axios from 'axios';
import * as d3 from 'd3';
import _, { sum } from 'lodash';
import {
  fetchTransactions,
  fetchIOs,
  fetchAssets,
  createAsset,
  editAsset,
  fetchIncomeStatement,
  storeStatements,
  loadFormValues
} from '../actions';
import AssetForm from './widgets/AssetForm';

class AssetCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4, 5, 6],
      formModal: false
    };
  }

  async componentDidMount() {
    // await this.props.fetchAssets(this.props.currentFarm);
    // await this.props.fetchIncomeStatement(this.props.currentFarm);
    this.prepareBalanceSheet();
  }
  // async componentDidUpdate() {
  //   await this.props.fetchAssets(this.props.currentFarm);
  //   await this.props.fetchIncomeStatement(this.props.currentFarm);
  //   this.balanceSheet();
  //   console.log("update")
  // }

  toggleModal = state => {
    console.log("asset modal toggle",state,this.state)
    
    this.prepareBalanceSheet();
    this.setState({
      [state]: !this.state[state]
    });
  };

  //each modal needs a different ID to display differently, or it'll be overlapping rendered...
  accountModal = (accountId, initialProps = {}, icon) => {
    // console.log('1', this.state.assetTypes);
    // console.log('2', this.props.assetCreationForm.type);
    // console.log('3', this.state.assetTypes[this.props.assetCreationForm.type]);
    //console.log('4',this.props);
    //console.log('button modal',initialProps)
    console.log("render",accountId)
    return (
      <>
        <Button
          className="btn-icon btn-2"
          color="primary"
          type="button"
          size="sm"
          onClick={() => {
            this.props.loadFormValues(initialProps); //Initialized form here
            this.toggleModal(accountId);
          }}
        >
          <span className="btn-inner--icon m-0">
            <i className={`ni ni-${icon}`} size="sm" />
            {accountId === 'newAccount' ? '' : ''}
          </span>
        </Button>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state[accountId]}
          toggle={() => this.toggleModal(accountId)}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>{accountId === 'newAccount' ? 'Create new asset!' : 'Edit asset'}</small>
                </div>
                <AssetForm accountId={accountId} onSubmitFunction={() => {this.toggleModal(accountId)}}/>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  };

  calculateMonthlyAccountBalance = (account,flatStatement, date) => {
    const debit = d3.sum(
      flatStatement.filter(e => e.account === account._id && new Date(e.m) <= date),
      d => d.totalDebit
    );
    const credit = d3.sum(
      flatStatement.filter(e => e.account === account._id && new Date(e.m) <= date),
      d => d.totalCredit
    );
  
    const net = debit - credit;
    const balance = net + account.initializedBalance
    return balance
  }

  prepareBalanceSheet = () => {
    const startTime = Date.now();
    const balanceSheet = {};
    const flatStatement = this.props.statements.raw;

    Object.values(this.props.assets).map(account => {
      this.state.displayMonth.map(month => {
        const d = new Date(new Date().getFullYear(), new Date().getMonth() - month, 2);
        const a = account._id;
        const y = d.getFullYear();
        const m = d.getMonth() + 1;

        balanceSheet[a] = balanceSheet[a] || {};
        balanceSheet[a][y] = balanceSheet[a][y] || {};
        balanceSheet[a][y][m] = balanceSheet[a][y][m] || {};
        balanceSheet[a][y][m].balance = this.calculateMonthlyAccountBalance(account,flatStatement,d);
        
        ////accumulating monthly Asset type totals
        balanceSheet[account.type] = balanceSheet[account.type] || {};
        balanceSheet[account.type][y] = balanceSheet[account.type][y] || {};
        balanceSheet[account.type][y][m] = balanceSheet[account.type][y][m] || {};
        balanceSheet[account.type][y][m].balance =
          (balanceSheet[account.type][y][m].balance || 0) + balanceSheet[a][y][m].balance;
        
        ////accumulating monthly NET asset
        balanceSheet.net = balanceSheet.net || {};
        balanceSheet.net[y] = balanceSheet.net[y] || {};
        balanceSheet.net[y][m] = balanceSheet.net[y][m] || {};
        balanceSheet.net[y][m].balance =
          (balanceSheet.net[y][m].balance || 0) + balanceSheet[a][y][m].balance;

      });
      // console.log("test balance formula",account.name,
      // this.calculateMonthlyAccountBalance(account,flatStatement, 
      //   new Date(new Date().getFullYear(), 11, 2)))
    });
    this.props.storeStatements({ name: 'assets', statement: balanceSheet });
    //console.log(balanceSheet, Date.now() - startTime);
  };

  assetsRowRender = assetName => {
    const data = Object.values(this.props.assets).filter(e => e.type === assetName);

    const rows = data
      .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0))
      .map(account => {
        return (
          <tr>
            <td>
              <Row>
                <div className="col-8 my-auto text-wrap pl-4">
                  {account.name}
                  <br />
                  <small>
                    {account.simpleAnnualInterest ? `${account.simpleAnnualInterest}%, ` : ''}
                    {account.term ? `${account.term} months` : ''}
                  </small>
                </div>
                <div className="col-4 text-right">
                  {this.accountModal(
                    account._id,
                    {
                      ...account,
                      effectiveDate: new Date(account.effectiveDate).toISOString().split('T')[0]
                    },
                    'settings'
                  )}
                </div>
              </Row>
            </td>
            {this.renderMonthly(account._id)}
          </tr>
        );
      });
    return rows;
  };

  renderMonthly = (asset) => {
    if (_.isEmpty(this.props.statements.assets)) return 

    const balances = this.state.displayMonth.map(m => {
      const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
      return (
        <td className="text-right">
          {new Intl.NumberFormat('en-US').format(
            this.accessMonthly(asset,d.getFullYear(),d.getMonth() + 1)
          )}
        </td>
      );
    })
    return balances;
  }
  
  accessMonthly = (asset,y,m) => {
    if (!this.props.statements.assets[asset]) return 0
    if (!this.props.statements.assets[asset][y]) return 0
    if (!this.props.statements.assets[asset][y][m]) return 0

    return (this.props.statements.assets[asset][y][m].balance || 0)
  }

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Assets</h3>
            </div>
            <div className="col text-right">
              <h4>Net worth 132,123,421</h4>
              <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                Expand/Collapse
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive size="sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">
                <Row>
                  <div className="col-8 my-auto">Type</div>
                  <div className="col-4 text-right">
                    {this.accountModal(
                      'newAccount',
                      {
                        type: 'cash',
                        initializedBalance: 0,
                        effectiveDate: new Date().toISOString().split('T')[0],
                        advanced: false
                      },
                      'fat-add'
                    )}
                  </div>
                </Row>
              </th>
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
              <th scope="row">
                TOTAL WEALTH
              </th>
              {this.renderMonthly('net')}
            </tr>
            <tr>
              <th scope="row">
                Cash
                {/* <Row>
                  <div className="col-8 my-auto">Cash</div>
                  <div className="col-4 text-right">{this.accountCreationModal('cash')}</div>
                </Row> */}
              </th>
              {this.renderMonthly('cash')}
            </tr>
            {this.assetsRowRender('cash')}
            <tr>
              <th scope="row">
                Term Saving
                {/* <Row>
                  <div className="col-8 my-auto">Saving</div>
                  <div className="col-4 text-right">{this.accountCreationModal('saving')}</div>
                </Row> */}
              </th>
              {this.renderMonthly('saving')}
            </tr>
            {this.assetsRowRender('saving')}
            <tr>
              <th scope="row">Investment</th>
              {!_.isEmpty(this.props.statements.assets) &&
                this.state.displayMonth.map(m => {
                  const d = new Date(new Date().getFullYear(), new Date().getMonth() - m, 1);
                  return (
                    <td className="text-right">
                      {new Intl.NumberFormat('en-US').format(
                        this.accessMonthly('bond',d.getFullYear(),d.getMonth() + 1) +
                        this.accessMonthly('stock',d.getFullYear(),d.getMonth() + 1)
                      )}
                    </td>
                  );
                })}
            </tr>
            {this.assetsRowRender('bond')}
            {this.assetsRowRender('stock')}
            <tr>
              <th scope="row">Gold</th>
              {this.renderMonthly('gold')}
            </tr>
            {this.assetsRowRender('gold')}
            <tr>
              <th scope="row">Insurance</th>
              {this.renderMonthly('insurance')}
            </tr>
            {this.assetsRowRender('insurance')}
            <tr>
              <th scope="row">Real Estates</th>
              {this.renderMonthly('realEstates')}
            </tr>
            {this.assetsRowRender('realEstates')}
            <tr>
              <th scope="row">High-Risk Assets</th>
              {this.renderMonthly('risky')}
            </tr>
            {this.assetsRowRender('risky')}
            <tr>
              <th scope="row">Toy</th>
              {this.renderMonthly('toy')}
            </tr>
            {this.assetsRowRender('toy')}
            <tr>
              <th scope="row">Foreign Currency</th>
              {this.renderMonthly('foreign')}
            </tr>
            {this.assetsRowRender('foreign')}
            <tr>
              <th scope="row">Lending</th>
              {this.renderMonthly('lending')}
            </tr>
            {this.assetsRowRender('lending')}
            <tr>
              <th scope="row">Other Assets</th>
              {this.renderMonthly('otherAsset')}
            </tr>
            {this.assetsRowRender('otherAsset')}
            <tr>
              <th scope="row">Credit Card</th>
              {this.renderMonthly('creditCard')}
            </tr>
            {this.assetsRowRender('creditCard')}
            <tr>
              <th scope="row">Borrowing</th>
              {this.renderMonthly('borrowing')}
            </tr>
            {this.assetsRowRender('borrowing')}
            <tr>
              <th scope="row">Other Liabilities</th>
              {this.renderMonthly('otherLiability')}
            </tr>
            {this.assetsRowRender('otherLiability')}
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
    currentFarm: state.currentFarm,
    initialValues: state.loadForm.values
  };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchIOs,
  fetchAssets,
  createAsset,
  editAsset,
  loadFormValues,
  fetchIncomeStatement,
  storeStatements
})(AssetCard);
