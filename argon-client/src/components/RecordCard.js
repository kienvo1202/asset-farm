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
import { toggleRecurring } from '../actions/';
import formatDate from '../utils/helper';

class RecordCard extends React.Component {
  renderTransactionDate = ({ input }) => {
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
      </FormGroup>
    );
  };

  renderAmount = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label">Amount</label>
        <Input className="form-control-alternative" id="amount" placeholder={1000} type="number" {...input} />
      </FormGroup>
    );
  };

  renderDescription = ({ input }) => {
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
        />
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

  renderFrom = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label">From</label>
        <Input type="select" id="select-from" {...input}>
          <option>Salary</option>
          <option>2</option>
          <option>3</option>
        </Input>
      </FormGroup>
    );
  };

  renderTo = ({ input }) => {
    return (
      <FormGroup>
        <label className="form-control-label">To</label>
        <Input type="select" id="select-to" {...input}>
          <option>1</option>
          <option>Expense</option>
          <option>3</option>
        </Input>
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
          <Form>
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
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return {
    recurringMode: state.displayMode.recurringMode
  };
};
export default reduxForm({
  form: 'record'
})(connect(mapStateToProps, { toggleRecurring })(RecordCard));
