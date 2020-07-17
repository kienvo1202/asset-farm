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
              
            </CardBody>
          </Card>
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
