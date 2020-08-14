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
import {
  fetchAssets,
  createAsset,
  editAsset,
  deleteAsset,
  fetchAccountPlan,
  createAccountPlan,
  editAccountPlan,
  deleteAccountPlan,
  fetchFarm,
  editFarm,
  loadFormValues,
  mountAssetCard
} from '../../actions';
import { accountTypesDefaultValues } from '../../utils/constants';

class PlanForm extends React.Component {
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
      amount: formValues.amount,
      nativeDebitCredit: defaultValues.nativeDebitCredit,
      liquidityScore: formValues.liquidityScore || defaultValues.liquidityScore,
      effectiveDate: formValues.effectiveDate,
      usefulLife: formValues.usefulLife,
      simpleAnnualInterest: formValues.simpleAnnualInterest,
      term: formValues.term,
      interestPaymentFrequency: formValues.interestPaymentFrequency,
      probabilityOfDefault: formValues.probabilityOfDefault,
      percentLossGivenDefault: formValues.percentLossGivenDefault,
      premiumPayment: formValues.premiumPayment,
      premiumDuration: formValues.premiumDuration,
      protectionValue: formValues.protectionValue,
      protectionDuration: formValues.protectionDuration
    };

    this.props.onSubmitClose();

    if (this.props.action === 'create') {
      //Create a new plan account
      // const newPlan = await this.props.createAccountPlan(account);
      const newPlan = await axios.post(`/api/v1/accountPlans/`,account)

      //Add new plan to array Portfolio in Farm
      const portfolio = [...this.props.currentFarmInfo.portfolio]
      portfolio.splice(
        this.props.index + 1,
        0,
        newPlan.data.data.newDoc._id
      );
      
      await this.props.editFarm(this.props.currentFarm, { portfolio });
      
    } else {
      await this.props.editAccountPlan(this.props.account._id, account);
      
      // await axios.patch(`/api/v1/accountPlans/${this.props.account._id}`,account)
      //no need to edit Portfolio Farm
    }
    //refetch to fill portfolio...
    await this.props.fetchFarm(this.props.currentFarm)
    //recalculate
    this.props.calculateFunction()
  };

  onDelete = async () => {
    this.props.onSubmitClose();
    // await this.props.deleteAccountPlan(this.props.account._id);
    await axios.delete(`/api/v1/accountPlans/${this.props.account._id}`)

    const portfolio = [...this.props.currentFarmInfo.portfolio]
      portfolio.splice(
        this.props.index,
        1
      );
    await this.props.editFarm(this.props.currentFarm, { portfolio });
    await this.props.fetchFarm(this.props.currentFarm)
    this.props.calculateFunction()
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
          Starting Balance
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
  renderFormAmount = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Amount
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
          <input
            className="custom-control-input"
            id=" customCheckLogin"
            type="checkbox"
            {...input}
          />
          <label className="custom-control-label" htmlFor=" customCheckLogin">
            <span className="text-muted">Advanced options</span>
          </label>
        </div>
      </FormGroup>
    );
  };
  renderAdvancedOptions = ({ input, label, placeholder, type, min, max }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          {label}
        </label>
        <InputGroup className="input-group-alternative">
          <Input placeholder={placeholder} type={type} min={min} max={max} {...input} />
        </InputGroup>
      </FormGroup>
    );
  };
  
  render() {
    return (
      <Form role="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="type" component={this.renderFormType} />
        <Field name="name" component={this.renderFormName} />
        <Field name="amount" component={this.renderFormAmount} />
        {/* <Field name="initializedBalance" component={this.renderFormBalance} /> */}
        <Field name="advanced" component={this.renderFormAdvanced} />

        <Row>
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].liquidityScore && (
              <Col xs="4">
                <Field
                  name="liquidityScore"
                  component={this.renderAdvancedOptions}
                  label="Liquidity"
                  placeholder="liquid"
                  type="number"
                  min="1"
                  max="1000"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].usefulLife && (
              <Col xs="4">
                <Field
                  name="usefulLife"
                  component={this.renderAdvancedOptions}
                  label="Useful Life"
                  placeholder="life"
                  type="number"
                  min="1"
                  max="500"
                />
              </Col>
            )}

          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].simpleAnnualInterest && (
              <Col xs="4">
                <Field
                  name="simpleAnnualInterest"
                  component={this.renderAdvancedOptions}
                  label="Annual Interest"
                  placeholder="interest"
                  type="number"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].term && (
              <Col xs="4">
                <Field
                  name="term"
                  component={this.renderAdvancedOptions}
                  label="Term"
                  placeholder="term"
                  type="number"
                  min="1"
                  max="120"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].interestPaymentFrequency && (
              <Col xs="4">
                <Field
                  name="interestPaymentFrequency"
                  component={this.renderAdvancedOptions}
                  label="Interest Frequency"
                  placeholder="frequency"
                  type="number"
                  min="0"
                  max="120"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].probabilityOfDefault && (
              <Col xs="4">
                <Field
                  name="probabilityOfDefault"
                  component={this.renderAdvancedOptions}
                  label="Default Probability"
                  placeholder="probs"
                  type="number"
                  min="0"
                  max="100"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].percentLossGivenDefault && (
              <Col xs="4">
                <Field
                  name="percentLossGivenDefault"
                  component={this.renderAdvancedOptions}
                  label="Loss Given Default"
                  placeholder="loss"
                  type="number"
                  min="0"
                  max="100"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].premiumPayment && (
              <Col xs="4">
                <Field
                  name="premiumPayment"
                  component={this.renderAdvancedOptions}
                  label="Premium Payment"
                  placeholder="premium"
                  type="number"
                  min="0"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].premiumDuration && (
              <Col xs="4">
                <Field
                  name="premiumDuration"
                  component={this.renderAdvancedOptions}
                  label="Premium Duration"
                  placeholder="months"
                  type="number"
                  min="1"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].protectionValue && (
              <Col xs="4">
                <Field
                  name="protectionValue"
                  component={this.renderAdvancedOptions}
                  label="Protection Value"
                  placeholder="value"
                  type="number"
                  min="0"
                />
              </Col>
            )}
          {this.props.assetCreationForm.advanced &&
            this.state.assetTypes[this.props.assetCreationForm.type].protectionDuration && (
              <Col xs="4">
                <Field
                  name="protectionDuration"
                  component={this.renderAdvancedOptions}
                  label="Protection Duration"
                  placeholder="months"
                  type="number"
                  min="1"
                />
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
            {this.props.action === 'create' ? 'Create!' : 'Save'}
          </Button>
          {/* do not display delete for Create Modal, or Modal of Income/Mixed, index=-1 */}
          {this.props.action !== 'create' && this.props.index !== -1 ? (
            <Button color="danger" outline type="button" onClick={this.onDelete}>
              Delete
            </Button>
          ) : (
            ''
          )}
        </div>
      </Form>
    );
  }
}

const selector = formValueSelector('planForm');
const mapStateToProps = state => {
  const assetCreationForm = selector(state, 'type', 'advanced');
  return {
    ios: state.ios,
    assets: state.assets,
    transactions: state.transactions,
    currentFarm: state.currentFarm,
    statements: state.statements,
    currentFarmInfo: state.currentFarmInfo,
    initialValues: state.loadForm.values,
    assetCreationForm: assetCreationForm
  };
};

PlanForm = reduxForm({
  form: 'planForm',
  enableReinitialize: true
})(PlanForm);

export default connect(mapStateToProps, {
  fetchAssets,
  createAsset,
  editAsset,
  deleteAsset,
  loadFormValues,
  fetchAccountPlan,
  createAccountPlan,
  editAccountPlan,
  deleteAccountPlan,
  fetchFarm,
  editFarm,
  mountAssetCard
})(PlanForm);
