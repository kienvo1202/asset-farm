import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminLayout from 'layouts/Admin.jsx';
import AuthLayout from 'layouts/Auth.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {this.props.isSignedIn && (
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
          )}
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          {!this.props.isSignedIn ? (
            <Redirect from="/" to="/auth/login" />
          ) : (
            <Redirect from="/" to="/admin/index" />
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, {})(App);
