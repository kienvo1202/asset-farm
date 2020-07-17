import React from 'react';

import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Modal
} from 'reactstrap';
import formatDate from '../utils/helper';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  fetchTransactions,
  fetchIOs,
  fetchAssets,
  createAsset,
  editAsset,
  fetchIncomeStatement,
  storeStatements,
  loadFormValues
} from '../actions';

import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { chartOptions, parseOptions, chartExample1, chartExample2 } from 'variables/charts.jsx';

class WealthCard extends React.Component {
  constructor() {
    super();
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    this.state = {
      displayMonth: [...Array(61).keys()],
      goodData: [],
      usualData: [],
      badData: [],
      testDataMedian: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Good',
            data: [2, 2.5, 2, 5, 7, 1.5, 5],
            fill: true,
            borderColor: 'rgba(51, 51, 204,0.8)'
          },
          {
            label: 'Usual',
            data: [1, 2, 1, 3, 6, 1, 3],
            fill: false,
            borderColor: 'rgba(0, 0, 0,0.8)'
          },

          {
            label: 'Bad',
            data: [0.5, 1, 0, 2, 5, 0.5, 2],
            fill: false,
            borderColor: 'rgba(153, 0, 255,0.8)'
          }
        ]
      },
      testOptions: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                borderDash: [8, 4],
                drawBorder: true,
                drawOnChartArea: true
              }
              // ticks: {
              // suggestedMin: 0,
              // suggestedMax: 100000000,
              // stepSize: 100000000
              // }
            }
          ]
        }
      }
    };
  }

  async componentDidMount() {
    this.calculateForecastAsset();
  }

  //each modal needs a different ID to display differently, or it'll overlap...
  accountModal = (accountId, initialProps = {}, icon) => {
    // console.log('1', this.state.assetTypes);
    // console.log('2', this.props.assetCreationForm.type);
    // console.log('3', this.state.assetTypes[this.props.assetCreationForm.type]);
    //console.log('4',this.props);
    //console.log('button modal',initialProps)
    return (
      <>
        <Button
          className="btn-icon btn-2"
          color="primary"
          type="button"
          size="sm"
          onClick={() => {
            this.props.loadFormValues(initialProps); //Initialized form here
            this.toggleModal(accountId);
          }}
        >
          <span className="btn-inner--icon">
            <i className={`ni ni-${icon}`} size="sm" />
            {accountId === 'newAccount' ? '' : ''}
          </span>
        </Button>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state[accountId]}
          toggle={() => this.toggleModal(accountId)}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>{accountId === 'newAccount' ? 'Create new asset!' : 'Edit asset'}</small>
                </div>
                {/* <AssetForm accountId={accountId} /> */}
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  };

  forecastAssetScenarios = (account, latestBalance, period) => {
    const result = {};
    let goodFactor = 1;
    let usualFactor = 1;
    let badFactor = 1;
    let worstFactor = 1;
    let goodBalance = latestBalance;
    let usualBalance = latestBalance;
    let badBalance = latestBalance;
    let worstBalance = latestBalance;

    if (account.type === 'saving') {
      goodFactor = Math.pow(1 + account.simpleAnnualInterest / 1200, period);
      usualFactor = Math.pow(1 + account.simpleAnnualInterest / 1200, period);
      // liquidity risk, early withdrawal
      badFactor = Math.pow(1 + account.simpleAnnualInterest / 1200, (period * 7) / 10);
    } else if (account.type === 'cash') {
      //some deteoration 1%/year
      //badFactor = Math.pow(1 - 1 / 1200, period );
    } else if (account.type === 'bond') {
      goodFactor =
        (1 + account.simpleAnnualInterest / ((100 * 12) / account.term)) * (period / account.term);
      //default risk
      usualFactor =
        goodFactor *
        (1 -
          (Math.pow(1 + account.defaultProbability, period / 12) - 1) * //probs of loss
            account.percentLossGivenDefault);
      badFactor =
        goodFactor *
        (1 -
          3 *
          (Math.pow(1 + account.defaultProbability, period / 12) - 1) * //probs of loss
            account.percentLossGivenDefault);
    } else if (account.type === 'stock') {
      usualFactor = Math.pow(1 + 0.009669902, period);
      //good and bad here fit better for the first 10 years, but not 30 years...
      goodFactor =
        Math.pow(1 + 0.007197223, period) + 1.090717099 * Math.log(1 + 0.237216461 * period);
      badFactor =
        Math.pow(1 + 0.007616879, period) - 0.427764871 * Math.log(1 + 0.190602412 * period);
    } else if (account.type === 'gold') {
      // usual rate 0.003663663 rounded up to 0.0041 for FX USDVND growth
      usualFactor = Math.pow(1 + 0.0041, period);
      goodFactor = usualFactor + 0.6795034 * Math.log(1 + 0.1684513 * period);
      badFactor = usualFactor - 2.373353072 * Math.log(1 + 0.004302365 * period);
    } else if (account.type === 'insurance') {
      //worst, exceptional case
      worstFactor = 1;
    } else if (account.type === 'toy') {
      //depreciation
      usualFactor = Math.pow(1 - 0.036, period);
      goodFactor = 1.2 * usualFactor;
      badFactor = 0.8 * usualFactor;
    } else {
      //real Estates, highrisk, lending, credit card, borrowing, others
      goodFactor = 1;
      usualFactor = 1;
      badFactor = 1;
    }

    result.goodForecastBalance = goodBalance * goodFactor;
    result.usualForecastBalance = usualBalance * usualFactor;
    result.badForecastBalance = badBalance * badFactor;
    result.worstForecastBalance = worstBalance * worstFactor;

    return result;
  };

  calculateForecastAsset = () => {
    console.log('cal worth');
    const startTime = Date.now();
    // const assets = this.props.assets;
    let sumGoodForecast = [];
    let sumUsualForecast = [];
    let sumBadForecast = [];

    Object.values(this.props.assets).map(account => {
      const a = account._id;
      let goodForecast = [];
      let usualForecast = [];
      let badForecast = [];

      const latestBalance = this.props.statements.assets[account._id][new Date().getFullYear()][
        new Date().getMonth() + 1
      ].balance;

      this.state.displayMonth.map(month => {
        const forecast = this.forecastAssetScenarios(account, latestBalance, month);
        goodForecast[month] = forecast.goodForecastBalance;
        usualForecast[month] = forecast.usualForecastBalance;
        badForecast[month] = forecast.badForecastBalance;
        sumGoodForecast[month] = (sumGoodForecast[month] || 0) + forecast.goodForecastBalance;
        sumUsualForecast[month] = (sumUsualForecast[month] || 0) + forecast.usualForecastBalance;
        sumBadForecast[month] = (sumBadForecast[month] || 0) + forecast.badForecastBalance;
        // if (account.type === "stock") {
        //   console.log("ood",sumGoodForecast[month], "usual",sumUsualForecast[month], "bad",sumBadForecast[month]);
        // }
      });

      // console.log(account, latestBalance, goodForecast[60], usualForecast[60], badForecast[60]);
      //console.log("good",sumGoodForecast[121], "usual",sumUsualForecast[121], "bad",sumBadForecast[121]);
    });

    console.log(
      'FINAL!! good',
      sumGoodForecast[60],
      'usual',
      sumUsualForecast[60],
      'bad',
      sumBadForecast[60]
    );

    const labels = this.state.displayMonth.map(month => {
      const d = new Date(new Date().getFullYear(), new Date().getMonth() + month, 1);
      const y = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
      const m = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      return y + '-' + m;
    });

    this.setState({
      testDataMedian: {
        labels: labels,
        datasets: [
          {
            label: 'Usual',
            data: sumUsualForecast,
            fill: false,
            borderColor: 'rgba(0, 0, 0,0.8)',
            backgroundColor: 'rgba(0, 0, 0,0.2)'
          },
          {
            label: 'Good',
            data: sumGoodForecast,
            fill: 1,
            borderColor: 'rgba(51, 51, 204,0.8)',
            backgroundColor: 'rgba(51, 51, 204,0.2)',
            borderDash: [5, 5]
          },

          {
            label: 'Bad',
            data: sumBadForecast,
            fill: 1,
            borderColor: 'rgb(153, 204, 255,0.2)',
            backgroundColor: 'rgb(153, 204, 255,0.2)',
            borderDash: [5, 5]
          }
        ]
      }
    });
  };

  

  render() {
    // console.log(this.state);
    const sampleCard = () => {
      return (
        <Col xs="6" lg="4" className="pl-0 pr-2">
          <Row className="m-0 p-0">
            <Col xs="11" className="p-0">
              <Card className="card-stats mb-3">
                <CardBody className="">
                  <Row>
                    <div className="col pr-0">
                      <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        Traffic
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">350,897</span>
                    </div>
                    <Col className="col-auto p-0 float-right">
                      <div className="icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> 3.48%
                    </span>{' '}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col xs="1" className="p-0 m-0 my-auto">
              <Button className="btn-icon btn-2" color="primary" type="button" size="sm">
                +
              </Button>
            </Col>
          </Row>
        </Col>
      );
    };
    return (
      <>
        <Card className="shadow pb-5">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase text-muted ls-1 mb-1">Forecast</h6>
                <h2 className="mb-0">Total Wealth</h2>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Line data={this.state.testDataMedian} options={this.state.testOptions} />
            </div>
          </CardBody>
        </Card>
        <Row className="mx-0" style={{ 'overflow-y': 'scroll', height: '50vh' }}>
          {sampleCard()}
          {sampleCard()}
          {sampleCard()}
          {sampleCard()}
          {sampleCard()}
          {sampleCard()}
          {sampleCard()}
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ios: state.ios,
    assets: state.assets,
    transactions: state.transactions,
    statements: state.statements,
    currentFarm: state.currentFarm
  };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  fetchIOs,
  fetchAssets,
  createAsset,
  editAsset,
  loadFormValues,
  fetchIncomeStatement,
  storeStatements
})(WealthCard);
