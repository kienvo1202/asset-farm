import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientID: '342998249912-n4105gnf5t45s5f4mj5orap6079asv5u.apps.googleusercontent.com',
        scope: 'email profile openid'
      });
    });
  }
  render() {
    return (
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
    );
  }
}

export default GoogleAuth;
