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

class WealthCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4]
    };
  }

  assetsRowRender = assetName => {
    const data = this.props.assets.filter(e => e.type === assetName);
    const rows = data.map(e => {
      return (
        <tr>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {e.name}</td>
          <td>
            <Progress max="100" value="75" barClassName="bg-gradient-info" />
          </td>
          <td>balance</td>
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
              <th scope="col">Info</th>
              <th scope="col">Future Balance</th>
              <th scope="col">Current Balance</th>
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
              <td><input type='range'></input></td>
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

export default connect(mapStateToProps, {})(WealthCard);
