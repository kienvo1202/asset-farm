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
import { connect } from 'react-redux';
import { fetchTransactions, fetchIOs, fetchAssets } from '../actions/';

class Reports extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4]
    };
  }

  iosRowRender = ioName => {
    const data = this.props.ios.filter(e => e.type === ioName);
    const rows = data.map(e => {
      return (
        <tr>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.name}</td>
          <td>average</td>
          <td>budget</td>
          {this.state.displayMonth.map(e => {
            return <td>1</td>;
          })}
        </tr>
      );
    });
    return rows;
  };

  assetsRowRender = assetName => {
    const data = this.props.assets.filter(e => e.type === assetName);
    const rows = data.map(e => {
      return (
        <tr>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.name}</td>
          <td>balance</td>
        </tr>
      );
    });
    return rows;
  };

  componentDidMount() {
    this.props.fetchIOs();
    this.props.fetchAssets();
    this.props.fetchTransactions();
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" lg="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Income & Expense</h3>
                    </div>
                    <div className="col text-right">
                      <span>Net earnings</span>
                      <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Items</th>
                      <th scope="col">Average</th>
                      <th scope="col">Budget</th>
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
                      <th scope="row">Total Income</th>
                      <td>4,569</td>
                      <td>40,569</td>
                    </tr>
                    {this.iosRowRender('income')}
                    <tr>
                      <th scope="row">Total Expense</th>
                      <td>3,513</td>
                      <td>294</td>
                    </tr>
                    {this.iosRowRender('expense')}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col lg="6">
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
                      <th scope="col">Types</th>
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
                      <th scope="row">Cash</th>
                      <td>1,480</td>
                    </tr>
                    {this.assetsRowRender('cash')}
                    <tr>
                      <th scope="row">Saving</th>
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
                      <th scope="row">Toy</th>
                      <td>4,807</td>
                    </tr>
                    {this.assetsRowRender('toy')}
                    <tr>
                      <th scope="row">Real Estates</th>
                      <td>4,807</td>
                    </tr>
                    {this.assetsRowRender('realEstates')}
                  </tbody>
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
    ios: state.ios,
    assets: state.assets,
    transactions: state.transactions
  };
};

export default connect(mapStateToProps, { fetchTransactions, fetchIOs, fetchAssets })(Reports);
