import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { signIn, signOut, authUnload, authLoad } from '../actions/';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

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
          //this.props.authLoad();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
          console.log("Auth Component Initiation")
        });
    });
  }
  componentWillUnmount() {
    //this.props.authUnload();
  }

  
  onAuthChange = async isSignedIn => { // isSignedIn here is maybe passed on from callback of this.auth.isSignedIn.listen
    if (isSignedIn) {
      console.log('OAUTH2', isSignedIn, this.auth, 'currentUser', this.auth.currentUser.get().getBasicProfile());
      const userInfo = {
        googleId: this.auth.currentUser.get().getId(),
        email: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getEmail(),
        name: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getName(),
        firstName: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getGivenName(),
        lastName: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getFamilyName(),
        imageUrl: this.auth.currentUser
          .get()
          .getBasicProfile()
          .getImageUrl()
      };
      this.props.signIn(userInfo);
      //console.log("state",this.props.auth.userInfo);
      
      const user = await axios.get(`/api/v1/users?googleId=${userInfo.googleId}`)
      console.log("Check new user")
      if (user.data.result == 0) {
        console.log("Registering new user")
        const newFarm = await axios.post(`/api/v1/farms/`,{name:`${userInfo.name}'s Farm`})
        
        userInfo.farms = ["5de608e532c37a25186e3911", newFarm.data.data.newDoc._id]
        console.log(newFarm, userInfo)
        const newUser = await axios.post(`/api/v1/users/`,userInfo)
        console.log(newUser)
      }
      
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    console.log("Render button")
    if ((this.props.auth.isSignedIn === null) | !this.auth) {
      return <div>Checking login status ...</div>;
    } else if (this.props.auth.isSignedIn) {
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
    auth: state.auth
  };
};

export default withRouter(connect(mapStateToProps, { signIn, signOut, authUnload, authLoad })(GoogleAuth));
