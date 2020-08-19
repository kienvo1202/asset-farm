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

class MarketplaceCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4]
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              <h3 className="mb-0">Marketplace</h3>
            </div>
          </Row>
        </CardHeader>
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

export default connect(mapStateToProps, {fetchTransactions, fetchIOs, fetchAssets})(MarketplaceCard);
