/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
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

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from 'variables/charts.jsx';

import Header from 'components/Headers/Header.jsx';
import formatDate from '../utils/helper';
import axios from 'axios';
import $ from 'cheerio';
import { connect } from 'react-redux';
import { toggleRecurring, fetchTransactions } from '../actions/';

class Records extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   description: '',
    //   amount: null,
    //   from: '',
    //   to: '',
    //   transactions: []
    // };
    
  }

  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    const transactionsRow = this.props.transactions.map(e => {
      return (
        <tr>
          <td>
            <FormGroup>
              <select className="form-control form-control-sm" id="select-to">
                <option>1</option>
                <option>2</option>
              </select>
            </FormGroup>
          </td>
          <td>{new Date(e.effectiveDate).toDateString()}</td>
          <td>{e.description}</td>
          <td>{e.amount}</td>
          <td>{e.from}</td>
          <td>{e.to}</td>
        </tr>
      );
    });

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0">
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
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-transaction-date">
                              Transaction Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={Date.now()}
                              id="transaction-date"
                              placeholder={formatDate(new Date())}
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-amount">
                              Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="amount"
                              placeholder={1000}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
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
                        </Col>
                      </Row>
                      <Row style={{ display: 'none' }}>
                        <Col>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-description-standard">
                              Description standard
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-description_standard"
                              placeholder="Description Standard"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-from">
                              From
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-from"
                              placeholder="From"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="6">
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-to">
                              To
                            </label>
                            <select className="form-control" id="select-to">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </FormGroup>
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
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-to">
                              Frequency
                            </label>
                            <select className="form-control" id="select-frequency">
                              <option>Weekly</option>
                              <option>Biweekly</option>
                              <option>Monthly</option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col
                          style={{
                            visibility: this.props.recurringMode ? '' : 'hidden'
                          }}
                        >
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-to">
                              Times
                            </label>
                            <select class="form-control" id="select-to">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h2 className="mb-0">
                        Transactions <i class="fas fa-list-ul"></i>
                      </h2>
                    </div>
                    <div className="col text-right">
                      <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                        Quick Edit
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Record Date</th>
                      <th scope="col">Transaction Date</th>
                      <th scope="col">Description</th>
                      <th scope="col">Amount</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                    </tr>
                  </thead>
                  <tbody>{transactionsRow}</tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    recurringMode: state.displayMode.recurringMode,
    transactions: state.transactions
  };
};

export default connect(mapStateToProps, { toggleRecurring, fetchTransactions })(Records);
