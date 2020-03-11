import React from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import { signIn, signOut, authUnload, authLoad } from '../actions/';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          client_id: '342998249912-n4105gnf5t45s5f4mj5orap6079asv5u.apps.googleusercontent.com',
          scope: 'email profile openid'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.props.authLoad();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  componentWillUnmount() {
    this.props.authUnload();
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      console.log('OAUTH2', this.auth, 'currentUser', this.auth.currentUser.get().getBasicProfile());
      const userInfo = {
        userId: this.auth.currentUser.get().getId(),
        email: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getEmail(),
        name: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getName(),
        givenName: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getGivenName(),
        familyName: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getFamilyName(),
        imageUrl: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getImageUrl()
      };
      console.log(userInfo);
      this.props.signIn(userInfo);
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if ((this.props.isSignedIn === null) | !this.auth) {
      return <div>Checking login status ...</div>;
    } else if (this.props.isSignedIn) {
      return (
        <Button className="btn-neutral btn-icon" color="default" onClick={this.auth.signOut}>
          <span className="btn-inner--icon">
            <img alt="..." src={require('assets/img/icons/common/google.svg')} />
          </span>
          <span className="btn-inner--text">Sign Out</span>
        </Button>
      );
    } else {
      return (
        <Button className="btn-neutral btn-icon" color="default" onClick={this.auth.signIn}>
          <span className="btn-inner--icon">
            <img alt="..." src={require('assets/img/icons/common/google.svg')} />
          </span>
          <span className="btn-inner--text">Sign In</span>
        </Button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isAuthLoaded: state.auth.isAuthLoaded
  };
};

export default connect(mapStateToProps, { signIn, signOut, authUnload, authLoad })(GoogleAuth);
