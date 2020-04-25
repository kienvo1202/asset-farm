import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { changeCurrentFarm } from '../../actions';
import axios from 'axios';

class DemoButton extends React.Component {

  renderButton = () => {
    if (this.props.currentFarm != '5de608e532c37a25186e3911') {
      return (
        <Button
          className="btn-neutral btn-icon"
          color="default"
          onClick={() => this.props.changeCurrentFarm('5de608e532c37a25186e3911')}
        >
          <span className="btn-inner--icon">
            <img alt="..." src={require('assets/img/icons/demo.png')} />
          </span>
          <span className="btn-inner--text">Load Demo Data</span>
        </Button>
      );
    } else {
      return (
        <Button
          className="btn-neutral btn-icon"
          color="default"
          onClick={()=>this.props.changeCurrentFarm(this.props.auth.userInfo.farms[0])}
        >
          <span className="btn-inner--icon">
            <img alt="..." src={require('assets/img/icons/demo.png')} />
          </span>
          <span className="btn-inner--text">Unload Demo Data</span>
        </Button>
      );
    }
  };

  render() {
    return this.renderButton();
  }
}

const mapStateToProps = state => {
  return {
    currentFarm: state.currentFarm,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { changeCurrentFarm })(DemoButton);
