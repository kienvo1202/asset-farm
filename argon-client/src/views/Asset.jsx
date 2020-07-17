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
  CardTitle,
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
import { connect } from 'react-redux';
import AssetCard from '../components/AssetCard';

class Asset extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col>
              <AssetCard key={this.props.mountAssetCardId} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    mountAssetCardId: state.displayMode.mountAssetCardId
  };
};

export default connect(mapStateToProps, {})(Asset);
