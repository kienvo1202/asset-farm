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

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleRecurring, createTransaction } from '../actions/';
import formatDate from '../utils/helper';

class RecordCard extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
    const transactions = {
      farm: '5de608e532c37a25186e3932',
      transactionNo: 12,
      debit: "5e95d66688dc1334381808f1", //formValues.from,
      credit: "5e95d66688dc1334381808e6",
      amount: formValues.amount,
      debitIsFrom: true,
      descriptionStandard: null,
      descriptionFree: formValues.description,
      effectiveDate: formValues.transactionDate
    };
    this.props.createTransaction(transactions);
  };

  renderError = ({ error, submitFailed }) => {
    if (error && submitFailed) {
      return <div className="text-warning">{error}</div>;
    }
  };

  renderTransactionDate = ({ input, meta }) => {
    return (
      <FormGroup>
        <label className="form-control-label">Transaction Date</label>
        <Input
          className="form-control-alternative"
          // defaultValue={Date.now()}
          id="transaction-date"
          type="date"
          {...input}
        />
        {this.renderError(meta)}
      </FormGroup>
    );
  };
  renderAmount = ({ input, meta }) => {
    console.log(meta);
    return (
      <FormGroup>
        <label className="form-control-label">Amount</label>
        <Input className="form-control-alternative" id="amount" placeholder={1000} type="number" {...input} />
        {this.renderError(meta)}
      </FormGroup>
    );
  };

  renderDescription = ({ input, meta }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description">
          Description
        </label>
        <Input
          className="form-control-alternative"
          id="input-description"
          placeholder="Description"
          type="text"
          {...input}
        />
        {this.renderError(meta)}
      </FormGroup>
    );
  };

  renderDescriptionStandard = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label" htmlFor="input-description-standard">
          Description standard
        </label>
        <Input
          className="form-control-alternative"
          id="input-description_standard"
          placeholder="Description Standard"
          type="text"
          {...input}
        />
      </FormGroup>
    );
  };

  renderFrom = ({ input, meta }) => {
    return (
      <FormGroup>
        <label className="form-control-label">From</label>
        <Input type="select" id="select-from" {...input}>
          <option value="5de608e532c37a25186e3931">Salary</option>
          <option value="5de608e532c37a25186e3931">Vietcombank</option>
          <option>3</option>
        </Input>
        {this.renderError(meta)}
      </FormGroup>
    );
  };

  renderTo = ({ input, meta }) => {
    return (
      <FormGroup>
        <label className="form-control-label">To</label>
        <Input type="select" id="select-to" {...input}>
          <option value="5de608e532c37a25186e3931">Vietcombank</option>
          <option>Expense</option>
          <option>3</option>
        </Input>
        {this.renderError(meta)}
      </FormGroup>
    );
  };

  renderRecurringToggle = ({ input }) => {
    return (
      <FormGroup>
        <span className="clearfix" />
        <label className="custom-toggle">
          <input type="checkbox" />
          <span
            className="custom-toggle-slider rounded-circle"
            onClick={() => this.props.toggleRecurring(!this.props.recurringMode)}
          />
        </label>
      </FormGroup>
    );
  };

  renderRecurringFrequency = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label">Frequency</label>
        <Input type="select" id="select-frequency" {...input}>
          <option>Weekly</option>
          <option>Biweekly</option>
          <option>Monthly strap</option>
        </Input>
      </FormGroup>
    );
  };

  renderRecurringTimes = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label">Times</label>

        <Input type="select" id="select-times" {...input}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
    );
  };

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">
                Record <i className="fas fa-pencil-alt"></i>
              </h2>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div>
              <Row>
                <Col xs="6">
                  <Field name="transactionDate" component={this.renderTransactionDate} />
                </Col>
                <Col xs="6">
                  <Field name="amount" component={this.renderAmount} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field name="description" component={this.renderDescription} />
                </Col>
              </Row>
              <Row style={{ display: 'none' }}>
                <Col>
                  <Field name="descStandard" component={this.renderDescriptionStandard} />
                </Col>
              </Row>
              <Row>
                <Col xs="6">
                  <Field name="from" component={this.renderFrom} />
                </Col>
                <Col xs="6">
                  <Field name="to" component={this.renderTo} />
                </Col>
              </Row>

              <hr className="my-4" />
              {/* <h6 className="heading-small text-muted mb-4">
                Recurring
              </h6> */}
              <Row>
                <Col xs="3">
                  <label className="form-control-label" htmlFor="input-to">
                    Recurring
                  </label>
                  <span className="clearfix" />
                  <label className="custom-toggle">
                    <input type="checkbox" />
                    <span
                      className="custom-toggle-slider rounded-circle"
                      onClick={() => this.props.toggleRecurring(!this.props.recurringMode)}
                    />
                  </label>
                </Col>
                <Col
                  style={{
                    visibility: this.props.recurringMode ? '' : 'hidden'
                  }}
                >
                  <Field name="recurringFrequency" component={this.renderRecurringFrequency} />
                </Col>
                <Col
                  style={{
                    visibility: this.props.recurringMode ? '' : 'hidden'
                  }}
                >
                  <Field name="recurringTimes" component={this.renderRecurringTimes} />
                </Col>
              </Row>
              <Row>
                <Button color="primary">Submit</Button>
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.transactionDate) {
    errors.transactionDate = 'Please fill in Transaction Date';
  }
  if (!formValues.amount) {
    errors.amount = 'Please fill in Amount';
  }
  if (!formValues.description) {
    errors.description = 'Please fill in Description';
  }
  if (!formValues.from) {
    errors.from = 'Please fill in From';
  }
  if (!formValues.to) {
    errors.to = 'Please fill in To';
  }

  return errors;
};

const mapStateToProps = state => {
  return {
    recurringMode: state.displayMode.recurringMode
  };
};
export default reduxForm({
  form: 'record',
  validate: validate
})(connect(mapStateToProps, { toggleRecurring, createTransaction })(RecordCard));
