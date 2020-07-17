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
import { fetchAssets, createAsset, editAsset, deleteAsset,loadFormValues,mountAssetCard } from '../../actions';
import { accountTypesDefaultValues } from '../../utils/constants';

class AssetForm extends React.Component {
  constructor() {
    super();
    this.state = {
      assetTypes: accountTypesDefaultValues
    };
  }
  componentDidMount() {
    
    //this.props.loadFormValues(this.props.initialProps);
  }
  onSubmit = async formValues => {
    const { assetTypes } = this.state;
    const defaultValues = assetTypes[this.props.assetCreationForm.type];
    const account = {
      farm: this.props.currentFarm,
      type: formValues.type,
      name: formValues.name,
      initializedBalance: formValues.initializedBalance,
      nativeDebitCredit: defaultValues.nativeDebitCredit,
      liquidityScore: defaultValues.liquidityScore || formValues.liquidityScore,
      effectiveDate: formValues.effectiveDate,
      usefulLife: formValues.usefulLife,
      simpleAnnualInterest: formValues.simpleAnnualInterest,
      term: formValues.term
    };
    if (this.props.accountId === 'newAccount') {
      await this.props.createAsset(account);
    } else {
      await this.props.editAsset(this.props.accountId, account);
    }
    
    
    // await this.props.fetchAssets(this.props.currentFarm);
    console.log("123")
    // this.props.mountAssetCard()
  };

  onDelete = async () => {
    await this.props.deleteAsset(this.props.accountId);
  };

  renderFormOptionTypes = () => {
    return Object.values(this.state.assetTypes).map(e => {
      if ((e.type !== 'income') & (e.type !== 'expense')) {
        return <option value={e.type}>{e.longType}</option>;
      }
    });
  };

  renderFormType = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Type
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-money-coins" />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="select" id="select-type" {...input}>
            {this.renderFormOptionTypes()}
          </Input>
        </InputGroup>
      </FormGroup>
    );
  };

  renderFormName = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Name
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-ruler-pencil" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Name" type="text" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  renderFormBalance = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Start Balance
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-spell-check" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="0" min="0" type="number" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  renderFormAdvanced = ({ input }) => {
    return (
      <FormGroup>
        <div className="custom-control custom-control-alternative custom-checkbox">
          <input className="custom-control-input" id=" customCheckLogin" type="checkbox" {...input} />
          <label className="custom-control-label" htmlFor=" customCheckLogin">
            <span className="text-muted">Advanced options</span>
          </label>
        </div>
      </FormGroup>
    );
  };
  renderFormEffectiveDate = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Effective Date
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-spell-check" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Date" type="date" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  renderFormLiquidity = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Liquidity
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-spell-check" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Liquid" type="number" min="1" max="1000" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  renderFormUsefulLife = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Life
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-spell-check" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Life" type="number" min="1" max="50" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  renderFormSimpleAnnualInterest = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Interest
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-spell-check" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Return" type="number" min="0" max="100" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  renderFormTerm = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Term
        </label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-spell-check" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Term" type="number" min="1" max="60" {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  render() {
    return (
      <Form role="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="type" component={this.renderFormType} />
        <Field name="name" component={this.renderFormName} />
        <Field name="initializedBalance" component={this.renderFormBalance} />
        <Field name="advanced" component={this.renderFormAdvanced} />

        <Row>
          {this.props.assetCreationForm.advanced && (
            <Col xs="7">
              <Field name="effectiveDate" component={this.renderFormEffectiveDate} />
            </Col>
          )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].liquidityScore && (
              <Col xs="4">
                <Field name="liquidityScore" component={this.renderFormLiquidity} />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].usefulLife && (
              <Col xs="4">
                <Field name="usefulLife" component={this.renderFormUsefulLife} />
              </Col>
            )}

          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].simpleAnnualInterest && (
              <Col xs="4">
                <Field name="simpleAnnualInterest" component={this.renderFormSimpleAnnualInterest} />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].term && (
              <Col xs="4">
                <Field name="term" component={this.renderFormTerm} />
              </Col>
            )}
        </Row>
        <div className="text-center">
          <Button
            className="my-4"
            color="primary"
            type="button"
            onClick={this.props.handleSubmit(this.onSubmit)}
          >
            {this.props.accountId === 'newAccount' ? 'Create!' : 'Save'}
          </Button>
          {this.props.accountId !== 'newAccount' ? (
            <Button color="danger" outline type="button" onClick={this.onDelete}>
              Delete
            </Button>
          ) : (
            ''
          )}

          {/* <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={this.props.onToggle}
          >
            Close
          </Button> */}
        </div>
      </Form>
    );
  }
}

const selector = formValueSelector('assetForm');
const mapStateToProps = state => {
  const assetCreationForm = selector(state, 'type', 'advanced');
  return {
    ios: state.ios,
    assets: state.assets,
    transactions: state.transactions,
    currentFarm: state.currentFarm,
    initialValues: state.loadForm.values,
    assetCreationForm: assetCreationForm
  };
};

AssetForm = reduxForm({
  form: 'assetForm',
  enableReinitialize: true
})(AssetForm);

export default connect(mapStateToProps, {
  fetchAssets,
  createAsset,
  editAsset,
  deleteAsset,
  loadFormValues,
  mountAssetCard
})(AssetForm);
