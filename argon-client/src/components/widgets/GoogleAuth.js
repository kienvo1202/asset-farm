import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { signIn, signOut, changeCurrentFarm,fetchFarm,storeAuth } from '../../actions';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class GoogleAuth extends React.Component {
  componentDidMount() {
    if (!this.props.auth.authObj) { //load gapi only once, instead of every time
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          client_id: '342998249912-n4105gnf5t45s5f4mj5orap6079asv5u.apps.googleusercontent.com',
          scope: 'email profile openid'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.props.storeAuth(this.auth)
          //this.props.authLoad();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
          console.log("Auth Component Initiation", this.auth)
        });
    });} else {
      this.auth =  this.props.auth.authObj
      this.onAuthChange(this.auth.isSignedIn.get());
    }

  }
  componentWillUnmount() {
    //this.props.authUnload();
  }

  changeFarm = async (farmId) => {
    this.props.changeCurrentFarm(farmId)
    if (farmId) { 
      await this.props.fetchFarm(farmId)
    }
  }
  
  onAuthChange = async isSignedIn => { // isSignedIn here is maybe passed on from callback of this.auth.isSignedIn.listen
    
    if (isSignedIn) {
      //console.log('OAUTH2', isSignedIn, this.auth, 'currentUser', this.auth.currentUser.get().getBasicProfile());
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
      //console.log("state",this.props.auth.userInfo);
      
      const user = await axios.get(`/api/v1/users?googleId=${userInfo.googleId}`)
      console.log("Check new user",user.data.data.docs[0])
      if (user.data.result == 0) {
        //console.log("Registering new user")
        const newFarm = await axios.post(`/api/v1/farms/`,{name:`${userInfo.name}'s Farm`})
        userInfo.farms = [newFarm.data.data.newDoc._id] //"5de608e532c37a25186e3911" demo
        
        const newUser = await axios.post(`/api/v1/users/`,userInfo)
        this.props.signIn(newUser.data.data.newDoc);

        //Creating new accounts from default
        const defaultAccounts = await axios.get(`/api/v1/accounts?farm=5de608e532c37a25186e3931`)
        console.log(defaultAccounts)
        const newAccounts = defaultAccounts.data.data.docs.map(e => {return {...e, farm:newFarm.data.data.newDoc._id, _id:null}})
        await axios.post(`/api/v1/accounts`,newAccounts)
      } else {
        this.props.signIn(user.data.data.docs[0]);
      }
      this.changeFarm(user.data.data.docs[0].farms[0])

    } else {
      this.props.signOut();
      this.changeFarm("")
    }
  };

  renderAuthButton() {
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

export default withRouter(connect(mapStateToProps, { signIn, signOut,changeCurrentFarm,fetchFarm,storeAuth })(GoogleAuth));
