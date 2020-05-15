/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © {`${(new Date()).getFullYear()} `}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://www.linkedin.com/in/trung-kien-vo-8170533a/"
                    target="_blank"
                  >
                    The Builder
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  
                  <NavItem>
                    <NavLink
                      to="/"
                      tag={Link}
                    >
                      User Farm
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/auth/partner"
                      tag={Link}
                    >
                      Partner Backyard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="/"
                      target="_blank"
                      tag={Link}
                    >
                      Blog
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
