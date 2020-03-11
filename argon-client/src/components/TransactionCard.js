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
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { fetchTransactions } from '../actions';

class TransactionCard extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  renderTransactionsRow = () =>
    this.props.transactions.map(e => {
      return (
        <tr>
          <td>
            <FormGroup>
              <select className="form-control form-control-sm" id="select-to">
                <option>1</option>
                <option>2</option>
              </select>
            </FormGroup>
          </td>
          <td>{new Date(e.effectiveDate).toDateString()}</td>
          <td>{e.description}</td>
          <td>{e.amount}</td>
          <td>{e.from}</td>
          <td>{e.to}</td>
        </tr>
      );
    });

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h2 className="mb-0">
                Transactions <i class="fas fa-list-ul"></i>
              </h2>
            </div>
            <div className="col text-right">
              <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                Quick Edit
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Record Date</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
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
    transactions: state.transactions
  };
};

export default connect(mapStateToProps, { fetchTransactions })(TransactionCard);
