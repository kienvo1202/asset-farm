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
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from 'reactstrap';
// import GoogleAuth from '../components/widgets/GoogleAuth';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  Field,
  reduxForm,
  formValueSelector,
  hasSubmitFailed,
  getFormSyncErrors,
  getFormSubmitErrors,
  hasSubmitSucceeded,
  SubmissionError
} from 'redux-form';
import {
  partnerSignIn,
  partnerSignOut
} from '../actions';
import { partnerCredentials } from '../utils/constants';

class PartnerLogin extends React.Component {
  renderEntrance = () => {
    if (this.props.auth.isPartnerSignedIn) {
      return (
        <Link to="/partner/product">
          <div className="btn-wrapper text-center mb-4">
            <Button className="btn-neutral btn-icon" color="default">
              {/* <span className="btn-inner--icon">
            <img alt="..." src={require('assets/img/icons/common/google.svg')} />
          </span> */}
              <span className="btn-inner--text">Access Your Backyard!</span>
            </Button>
          </div>
        </Link>
      );
    } else {
      return (
        <div className="text-center text-muted mb-4">
          Login for access
        </div>
      );
    }
  };

  onSubmit = formValues => {
    // console.log(formValues.username,partnerCredentials[formValues.username],formValues.password)
    if (!partnerCredentials[formValues.username]) {
      throw new SubmissionError({ partner: 'Wrong credentials...', _error: 'Login failed!' })
    } else if (partnerCredentials[formValues.username].password === formValues.password) {
      console.log('hi partner')
      this.props.partnerSignIn(partnerCredentials[formValues.username])
    } else {
      throw new SubmissionError({ partner: 'Wrong credentials...', _error: 'Login failed!' })
    }
  };

  renderError = (error, submitFailed) => {
    if (error && submitFailed) {
      return <div className="text-warning">{error}</div>;
    }
  };

  render() {
    console.log(
      this.props.submitErrors,
      this.props.submitFailed,
      this.props.formSyncErrors,
      this.props.submitSucceeded
    );
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-4">
              <div className="btn-wrapper text-center">
                {!this.props.auth.isPartnerSignedIn ? 
                <>
                <div className="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                <Form role="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        name="username"
                        placeholder="Username"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                      {/* <Input placeholder="Email" type="email" /> */}
                    </InputGroup>
                    {this.renderError(this.props.formSyncErrors.username,this.props.submitFailed)}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field
                        name="password"
                        placeholder="Password"
                        component="input"
                        type="password"
                        className="form-control"
                      />
                      {/* <Input placeholder="Password" type="password" /> */}
                    </InputGroup>
                    {this.renderError(this.props.formSyncErrors.password,this.props.submitFailed)}
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      color="primary"
                      type="button"
                      onClick={this.props.handleSubmit(this.onSubmit)}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form></> :
                <> 
                <div className="text-center text-muted mb-4">
                  <small>Login Success</small>
                </div>
                <div className="text-center">
                <Button
                  color="secondary"
                  type="button"
                  onClick={this.props.partnerSignOut}
                >
                  Sign out
                </Button></div></> }
              </div> 
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">{this.renderEntrance()}</CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.username) {
    errors.username = 'Please fill in username';
  }
  if (!formValues.password) {
    errors.password = 'Please fill in password';
  }
  return errors;
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    submitErrors: getFormSubmitErrors('partnerAuthForm')(state),
    submitFailed: hasSubmitFailed('partnerAuthForm')(state),
    submitSucceeded: hasSubmitSucceeded('partnerAuthForm')(state),
    formSyncErrors: getFormSyncErrors('partnerAuthForm')(state)
  };
};

PartnerLogin = reduxForm({
  form: 'partnerAuthForm',
  validate: validate
})(PartnerLogin);

//withRouter to integrate Router & Redux, give access to this.props.location from everywhere
export default connect(mapStateToProps, {partnerSignIn,partnerSignOut})(PartnerLogin);
