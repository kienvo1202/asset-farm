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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal
} from 'reactstrap';

import axios from 'axios';
import { connect } from 'react-redux';
import { fetchTransactions, fetchIOs, fetchAssets } from '../actions';

class AssetCard extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMonth: [0, 1, 2, 3, 4],
      formModal: false
    };
  }

  componentDidMount() {
    this.props.fetchIOs(this.props.currentFarm);
    this.props.fetchAssets(this.props.currentFarm);
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  accountCreationModal = () => {
    return (
      <>
        <Button
          className="btn-icon btn-2"
          color="primary"
          type="button"
          size="sm"
          onClick={() => this.toggleModal('formModal')}
        >
          <span className="btn-inner--icon">
            <i className="ni ni-fat-add" size="sm" />
          </span>
        </Button>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.formModal}
          toggle={() => this.toggleModal('formModal')}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <span className="btn-inner--icon">
                      <img alt="..." src={require('assets/img/icons/common/github.svg')} />
                    </span>
                    <span className="btn-inner--text">Github</span>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <span className="btn-inner--icon">
                      <img alt="..." src={require('assets/img/icons/common/google.svg')} />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button">
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
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
              <th scope="row">
                <Row>
                  <div className="col-8 my-auto">Cash   </div>
                  <div className="col-4 text-right">{this.accountCreationModal()}</div>
                </Row>
              </th>
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
    transactions: state.transactions,
    currentFarm: state.currentFarm
  };
};

export default connect(mapStateToProps, { fetchTransactions, fetchIOs, fetchAssets })(AssetCard);
