import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { changeCurrentFarm,fetchFarm } from '../../actions';
import axios from 'axios';

class DemoButton extends React.Component {
  changeFarm = async (farmId) => {
    this.props.changeCurrentFarm(farmId)
    if (farmId) { 
      await this.props.fetchFarm(farmId)
    }
  }

  renderButton = () => {
    const demoFarmId = '5de608e532c37a25186e3911'

    if (this.props.currentFarm != demoFarmId) {
      return (
        <Button
          className="btn-neutral btn-icon"
          color="default"
          onClick={() => this.changeFarm(demoFarmId)}
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
          onClick={()=>this.changeFarm(this.props.auth.userInfo.farms[0])}
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

export default connect(mapStateToProps, { changeCurrentFarm,fetchFarm })(DemoButton);
