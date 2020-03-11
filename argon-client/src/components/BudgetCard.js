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

class IOCard extends React.Component {
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
          <td>12</td>
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
              <h3 className="mb-0">Budgeting</h3>
            </div>
            <div className="col text-right">
              <span>Net earnings</span>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Items</th>
              <th scope="col">Planned / Budget</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Total Income</th>
              <td>40,569</td>
            </tr>
            {this.iosRowRender('income')}
            <tr>
              <th scope="row">Total Expense</th>
              <td>3,513</td>
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
    transactions: state.transactions
  };
};

export default connect(mapStateToProps, {})(IOCard);
