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
import _ from 'lodash';

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

class NetIncomeForm extends React.Component {
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
    this.props.onSubmitClose();
    const type = this.props.type === 'plan' ? 'averageNetIncomePlan' : 'averageNetIncomeDefault'
    await this.props.editFarm(this.props.currentFarm,{[type]:formValues.amount})
    this.props.calculateFunction()
  };
  
  renderFormAmount = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Investable Net Income
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
  
  render() {
    const avgNetIncome = _.round(
      -this.props.statements.io['income'].average -
        this.props.statements.io['expense'].average,
      -3
    )
    return (
      <Form role="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        
        <Field name="amount" component={this.renderFormAmount} />
        

        <div className="text-center">
        <Button
            className="my-4"
            color="primary"
            type="button"
            size="sm"
            onClick={() => this.props.loadFormValues({amount:avgNetIncome})}
          >
            Use Average Net Income
          </Button>
          <Button
            className="my-4"
            color="primary"
            type="button"
            size="sm"
            onClick={this.props.handleSubmit(this.onSubmit)}
          >
            Save
          </Button>
          
        </div>
      </Form>
    );
  }
}

const selector = formValueSelector('netIncomeForm');
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

NetIncomeForm = reduxForm({
  form: 'netIncomeForm',
  enableReinitialize: true
})(NetIncomeForm);

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
})(NetIncomeForm);
