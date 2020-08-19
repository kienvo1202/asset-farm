import React from 'react';
import {
  Button,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,

} from 'reactstrap';
import _ from 'lodash';

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import axios from 'axios';
import {
  editIO,
  loadFormValues,
  mountAssetCard
} from '../../actions';

class BudgetForm extends React.Component {
  constructor() {
    super();
  }
  
  onSubmit = async formValues => {
    this.props.onSubmitClose();
    await this.props.editIO(this.props.account._id,{budget:formValues.budget || 0})
    
  };
  
  renderFormBudget = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Budget Amount
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
    return (
      <Form role="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="budget" component={this.renderFormBudget} />
        
        <div className="text-center">
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

const selector = formValueSelector('budgeteForm');
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

BudgetForm = reduxForm({
  form: 'budgeteForm',
  enableReinitialize: true
})(BudgetForm);

export default connect(mapStateToProps, {
  editIO,
  loadFormValues,
  mountAssetCard,
})(BudgetForm);
