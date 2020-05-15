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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // FormGroup,
  // Form,
  // Input,
  // InputGroupAddon,
  // InputGroupText,
  // InputGroup,
  // Row,
  Col
} from 'reactstrap';
import GoogleAuth from '../components/widgets/GoogleAuth';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class Login extends React.Component {
  renderEntrance = () => {
    if (this.props.isSignedIn) {
      return (
        <Link to="/admin/index">
          <div className="btn-wrapper text-center">
            <Button className="btn-neutral btn-icon" color="default">
              {/* <span className="btn-inner--icon">
            <img alt="..." src={require('assets/img/icons/common/google.svg')} />
          </span> */}
              <span className="btn-inner--text">Enter Your Farm!</span>
            </Button>
          </div>
        </Link>
      );
    } else {
      return (
        <div className="text-center text-muted mb-4">
          <p>Login to enter your farm</p>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="btn-wrapper text-center">
                <GoogleAuth />
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {this.renderEntrance()}
              {/* <Form role="form">
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
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>*/}
            </CardBody>
          </Card>
          {/* <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row> */}
        </Col>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isAuthLoaded: state.auth.isAuthLoaded
  };
};
//withRouter to integrate Router & Redux, give access to this.props.location from everywhere
export default withRouter(connect(mapStateToProps)(Login));
