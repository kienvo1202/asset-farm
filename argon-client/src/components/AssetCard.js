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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Label
} from 'reactstrap';

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import axios from 'axios';
import { fetchTransactions, fetchIOs, fetchAssets, createAsset, editAsset, loadFormValues } from '../actions';
import AssetForm from './widgets/AssetForm';

class AssetCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4],
      formModal: false
    };
  }

  componentDidMount() {
    this.props.fetchIOs(this.props.currentFarm);
    this.props.fetchAssets(this.props.currentFarm);
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  accountModal = (accountId, initialProps = {}, icon) => {
    // console.log('1', this.state.assetTypes);
    // console.log('2', this.props.assetCreationForm.type);
    // console.log('3', this.state.assetTypes[this.props.assetCreationForm.type]);
    //console.log('4',this.props);
    //console.log('button modal',initialProps)
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
          <span className="btn-inner--icon">
            <i className={`ni ni-${icon}`} size="sm" />
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

                <AssetForm accountId={accountId} />
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  };

  assetsRowRender = assetName => {
    const data = Object.values(this.props.assets).filter(e => e.type === assetName);
    const rows = data
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map(e => {
        return (
          <tr>
            <td>
              <Row>
                <div className="col-8 my-auto text-wrap pl-4">
                  {e.name}
                  <br />
                  <small>
                    {e.simpleAnnualReturn ? `${e.simpleAnnualReturn}%, ` :''}
                    {e.term ? `${e.term} months` :''}
                  </small>
                </div>
                <div className="col-3 text-right">
                  {this.accountModal(
                    e._id,
                    { ...e, effectiveDate: new Date(e.effectiveDate).toISOString().split('T')[0] },
                    'settings'
                  )}
                </div>
              </Row>
            </td>
            <td>balance</td>
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
              <h3 className="mb-0">Assets</h3>
            </div>
            <div className="col text-right">
              <h4>Net worth 132,123,421</h4>
              <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                See all
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
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
                Cash
                {/* <Row>
                  <div className="col-8 my-auto">Cash</div>
                  <div className="col-4 text-right">{this.accountCreationModal('cash')}</div>
                </Row> */}
              </th>
              <td>1,480</td>
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
              <td>5,480</td>
            </tr>
            {this.assetsRowRender('saving')}
            <tr>
              <th scope="row">Investment</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('bond')}
            {this.assetsRowRender('stock')}
            <tr>
              <th scope="row">Gold</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('gold')}
            <tr>
              <th scope="row">Insurance</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('insurance')}
            <tr>
              <th scope="row">Real Estates</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('realEstates')}
            <tr>
              <th scope="row">High-Risk Assets</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('risky')}
            <tr>
              <th scope="row">Toy</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('toy')}
            <tr>
              <th scope="row">Lending</th>
              <td>4,807</td>
            </tr>
            {this.assetsRowRender('lending')}
            <tr>
              <th scope="row">Other Assets</th>
              <td>333</td>
            </tr>
            {this.assetsRowRender('otherAsset')}
            <tr>
              <th scope="row">Credit Card</th>
              <td>333</td>
            </tr>
            {this.assetsRowRender('creditCard')}
            <tr>
              <th scope="row">Borrowing</th>
              <td>333</td>
            </tr>
            {this.assetsRowRender('borrowing')}
            <tr>
              <th scope="row">Other Liabilities</th>
              <td>333</td>
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
  loadFormValues
})(AssetCard);
