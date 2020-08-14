import React from 'react';

import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col,
  Modal,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
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
  loadFormValues,
  extractMaxYChart
} from '../actions';

import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { chartOptions, parseOptions, chartExample1, chartExample2 } from 'variables/charts.jsx';
import { accountTypesDefaultValues } from '../utils/constants';

class WealthCard extends React.Component {
  constructor() {
    super();
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    this.state = {
      displayMonth: [...Array(61).keys()],
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
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          ]
        }
      }
    };
  }

  async componentDidMount() {
    await this.calculateForecastAsset();

    const bestArray = this.state.testDataMedian.datasets[1].data;
    await this.props.extractMaxYChart({
      chart: 'defaultChartY',
      value: bestArray[bestArray.length - 1]
    });

    const higherMax = Math.max(
      this.props.display.defaultChartY,
      this.props.display.simulationChartY
    );
    const zeros = Math.floor(Math.log10(higherMax));
    const multiple = Math.ceil(higherMax / Math.pow(10, zeros));
    const commonMax = multiple * Math.pow(10, zeros);

    this.setState({
      testOptions: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                borderDash: [8, 4],
                drawBorder: true,
                drawOnChartArea: true
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: commonMax
              }
            }
          ]
        }
      }
    });
    // console.log('default', commonMax, this.state);
  }

  //forecast future values for 1 account at 1 certain time, with a specific initial/starting amount
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
      // IF CASH TO SAVING?
      if (true) {
        const r = 0.037 / 12
        goodFactor = 1 + 0.98 * (Math.pow(1 + 1.25 * r, period) - 1);
        usualFactor = 1 + 0.95 * (Math.pow(1 + 0.93 * r, period) - 1);
        badFactor = 1 + 0.8 * (Math.pow(1 + 0.71 * r, period) - 1);
      }
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

  //aggregate forecasted balances of multiple accounts into 3 scenarios
  calculateForecastAsset = () => {
    // console.log('cal worth');
    const startTime = Date.now();
    // const assets = this.props.assets;
    let sumGoodForecast = [];
    let sumUsualForecast = [];
    let sumBadForecast = [];

    Object.values(this.props.assets).map(account => {
      
      // let goodForecast = [];
      // let usualForecast = [];
      // let badForecast = [];

      const latestBalance = this.props.statements.assets[account._id][new Date().getFullYear()][
        new Date().getMonth() + 1
      ].balance;

      this.state.displayMonth.map(month => {
        const forecast = this.forecastAssetScenarios(account, latestBalance, month);
        // goodForecast[month] = forecast.goodForecastBalance;
        // usualForecast[month] = forecast.usualForecastBalance;
        // badForecast[month] = forecast.badForecastBalance;
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

    //add static salary to balances
    this.state.displayMonth.map(month => {
      const net = _.round(
        -this.props.statements.io['income'].average - this.props.statements.io['expense'].average,
        -5
      );
      const r = 0.037 / 12; //current 1m interest
      // add 0.95 factor as not all cash is kept to maturity
      const goodFactor = 0.95 * ((Math.pow(1 + 1.25 *  r, month) - 1) / (1.25*r) - 1) + 1
      const usualFactor = 0.95 * ((Math.pow(1 + 0.93  * r, month) - 1) / (0.93*r) -1) + 1
      const badFactor = 0.95 * ((Math.pow(1 + 0.71  * r, month) - 1) / (0.71*r) -1)+1

      sumGoodForecast[month] = Number.parseFloat(
        (sumGoodForecast[month] || 0) + net * goodFactor
      ).toPrecision(4);
      sumUsualForecast[month] = Number.parseFloat(
        (sumUsualForecast[month] || 0) + net * usualFactor
      ).toPrecision(4);
      sumBadForecast[month] = Number.parseFloat(
        (sumBadForecast[month] || 0) + net * badFactor
      ).toPrecision(4);
      // console.log(net, usualFactor);
    });

    console.log(
      'FINAL default',
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
            borderColor: 'rgb(0, 51, 153,0.8)',
            backgroundColor: 'rgba(0, 0, 0,0.2)',
            borderWidth: 6,
            borderJoinStyle: 'round',
            borderCapStyle: 'round'
          },
          {
            label: 'Good',
            data: sumGoodForecast,
            fill: 1,
            borderColor: 'rgb(0, 51, 153,0.5)',
            backgroundColor: 'rgba(51, 51, 204,0.2)',
            borderDash: [5, 10],
            borderWidth: 2,
            borderJoinStyle: 'round',
            borderCapStyle: 'round'
          },

          {
            label: 'Bad',
            data: sumBadForecast,
            fill: 1,
            borderColor: 'rgb(0, 51, 153,0.5)',
            backgroundColor: 'rgb(153, 204, 255,0.2)',
            borderDash: [5, 10],
            borderWidth: 2,
            borderJoinStyle: 'round',
            borderCapStyle: 'round'
          }
        ]
      }
    });
  };

  render() {
    // console.log(this.state);
    const sampleCard = account => {
      return (
        <Col xs="12" lg="12" className="pl-0 pr-2">
          <Row className="m-0 p-0">
            <Col xs="11" className="p-0">
              <Card className="card-stats mb-3">
                <CardBody className="">
                  <Row>
                    <Col>
                      <Col className="pb-2 px-0">
                        <CardTitle tag="h5" className="text-muted mb-0">
                          Type
                        </CardTitle>
                        <span className="text-muted text-sm mb-0">{`${
                          accountTypesDefaultValues[account.type].longType
                        } - ${account.name}`}</span>
                      </Col>
                      <Col className="pb-2 px-0">
                        <CardTitle tag="h5" className="text-muted mb-0">
                          {account.type == 'income' ? 'Amount' : 'Balance'}
                        </CardTitle>
                        <span className="h4 font-weight-bold mb-0">
                          {account.type == 'income'
                            ? new Intl.NumberFormat('en-US').format(
                                _.round(
                                  -this.props.statements.io['income'].average -
                                    this.props.statements.io['expense'].average,
                                  -3
                                )
                              )
                            : new Intl.NumberFormat('en-US').format(
                                this.props.statements.assets[account._id][new Date().getFullYear()][
                                  new Date().getMonth() + 1
                                ].balance
                              )}
                        </span>
                      </Col>
                      <Col className="pb-2 px-0">
                        <CardTitle tag="h5" className="text-muted mb-0">
                          Effective Date
                        </CardTitle>
                        <span className="text-muted text-sm mb-0">
                          {new Intl.DateTimeFormat('en', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }).format(new Date(account.effectiveDate))}
                        </span>
                      </Col>
                      {/* <Col className="col-auto p-0 float-right">
                      <div className="icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col> */}
                    </Col>
                    <Col>
                      <CardTitle tag="h5" className="text-muted mb-0">
                        Features
                      </CardTitle>
                      <p className="mt-2 mb-0 text-muted text-sm">
                        {/* <span>
                          Interest: {Number.parseFloat(account.simpleAnnualInterest).toPrecision(3)}
                          %{' '}
                        </span>
                        <br />
                        <span>Term: {account.term} </span>
                        <br />
                        <span>Liquidity: High. </span>
                        <br /> */}
                      </p>
                      {/* <ul className="p-0 my-0 ml-1">
                        <li style={{fontSize: '0.8rem'}}>Interest: 4%.</li>
                        <li style={{fontSize: '0.8rem'}}>Term: 6 months. </li>
                        <li style={{fontSize: '0.8rem'}}>Liquidity: High. </li>
                      </ul> */}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xs="1" className="p-0 m-0 my-auto">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-white m-0 p-1"
                  role="button"
                  size="sm"
                  color="info"
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>Add Below</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
                <h2 className="mb-0">Total Wealth with Basic Savings</h2>
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
          {sampleCard({
            type: 'income',
            name: 'Investable Net Income',
            effectiveDate: new Date()
          })}
          {sampleCard({
            type: 'mixed',
            name: 'Total Wealth',
            _id: 'net',
            effectiveDate: new Date()
          })}
          {/* {Object.values(this.props.assets).map(account => sampleCard(account))} */}
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
    currentFarm: state.currentFarm,
    display: state.displayMode
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
  storeStatements,
  extractMaxYChart
})(WealthCard);
