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
import formatDate from '../utils/helper';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchTransactions, fetchIOs, fetchAssets } from '../actions';

class IOCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4]
    };
  }
  componentDidMount() {
    this.props.fetchIOs(this.props.currentFarm);
    this.props.fetchAssets(this.props.currentFarm);
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

  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => {
  return {
    ios: state.ios,
    assets: state.assets,
    transactions: state.transactions,
    currentFarm: state.currentFarm
  };
};

export default connect(mapStateToProps, {fetchTransactions, fetchIOs, fetchAssets })(IOCard);
