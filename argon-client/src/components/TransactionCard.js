import React from 'react';
import {
  Button,
  Card,
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
import { connect } from 'react-redux';
import { fetchTransactions, deleteTransaction } from '../actions';
import '../assets/css/alter-layer.css';

class TransactionCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.props.fetchTransactions(this.props.currentFarm);    
  }

  //each modal needs a different ID to display differently, or it'll be overlapping rendered...
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  deleteTransactionModal = (id, initialProps = {}, icon) => {
    // console.log('1', this.state.assetTypes);
    // console.log('2', this.props.assetCreationForm.type);
    // console.log('3', this.state.assetTypes[this.props.assetCreationForm.type]);
    //console.log('4',this.props);
    //console.log('button modal',initialProps)
    return (
      <>
        <Button
          className="btn-icon btn-2 p-0"
          color="warning"
          type="button"
          // size="sm"
          onClick={() => {
            this.toggleModal(id);
          }}
        >
          <span className="btn-inner--icon m-0">
            <i className={`ni ni-${icon}`} size="sm" />
            {/* {id === 'newAccount' ? '' : ''} */}
          </span>
        </Button>
        <Modal
          className="modal-dialog-centered modal-danger"
          size="sm"
          isOpen={this.state[id]}
          toggle={() => this.toggleModal(id)}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-notification">
              Warning
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal(id)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="py-3 text-center">
              <i className="ni ni-bell-55 ni-3x" />
              <h4 className="heading mt-4">Be careful</h4>
              <p>Deleting transaction cannot be undone.</p>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              className="btn-white"
              color="default"
              type="button"
              onClick={() => {
                this.props.deleteTransaction(id);
                this.toggleModal(id);
              }}
            >
              Ok, delete
            </Button>
            <Button
              className="text-white ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal(id)}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </>
    );
  };

  renderTransactionsRow = () => {
    //console.log(Object.values(this.props.transactions))
    const rows = Object.values(this.props.transactions)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0))
      .slice(0, 30)
      .map(e => {
        const tdRowStyle = { overFlow: 'break-word', whiteSpace: 'pre-wrap', fontSize: '0.75rem' };

        const date =
          new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(e.effectiveDate)) +
          '-' +
          new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date(e.effectiveDate)) +
          '-' +
          new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(e.effectiveDate));

        return (
          <tr className="d-flex">
            {/* <td>
              <FormGroup>
                <select className="form-control form-control-sm" id="select-to">
                  <option>1</option>
                  <option>2</option>
                </select>
              </FormGroup>
            </td> */}
            <td className="col-3 px-3" style={tdRowStyle}>
              {date}
              <br />
              {e.descriptionFree}
            </td>
            <td className="col-3 px-2 text-right" style={tdRowStyle}>
              {new Intl.NumberFormat('en-US').format(e.amount)}
              <br />
              {this.deleteTransactionModal(e._id, {}, 'fat-remove')}
            </td>
            <td className="col-3 px-2" style={tdRowStyle}>
              {e.credit.name}
            </td>
            <td className="col-3 px-3" style={tdRowStyle}>
              {e.debit.name}
            </td>
          </tr>
        );
      });

    return rows;
  };

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">
                Transactions <i className="fas fa-list-ul"></i>
              </h2>
            </div>
            <div className="col text-right">
              <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                Quick Edit
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table
          className="align-items-center table-flush p-2"
          style={{ tableLayout: 'fixed' }}
          responsive
          size="sm"
        >
          <thead className="thead-light">
            <tr class="d-flex">
              <th scope="col" className="col-3 px-3">
                Description
              </th>
              <th scope="col" className="col-3 px-2">
                Amount
              </th>
              <th scope="col" className="col-3 px-2">
                From
              </th>
              <th scope="col" className="col-3 px-3">
                To
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTransactionsRow()}</tbody>
        </Table>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    currentFarm: state.currentFarm
  };
};

export default connect(mapStateToProps, { fetchTransactions, deleteTransaction })(TransactionCard);
