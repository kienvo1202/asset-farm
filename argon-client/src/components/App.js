import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminLayout from 'layouts/Admin.jsx';
import PartnerLayout from 'layouts/Partner.jsx';
import AuthLayout from 'layouts/Auth.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {this.props.auth.isSignedIn && (
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
          )}
          {this.props.auth.isPartnerSignedIn && (
            <Route path="/partner" render={props => <PartnerLayout {...props} />} />
          )}
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          {!this.props.auth.isSignedIn &&
            <Redirect from="/" to="/auth/login" />
          }
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {})(App);
