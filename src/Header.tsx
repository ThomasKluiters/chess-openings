import React from 'react';
import { Container, Row, Col, Nav } from 'reactstrap';

import './Header.css';

interface HeaderProps extends React.HTMLProps<HTMLDivElement>  {
  [key: string]: any;
  tag?: React.ReactType;

  title?: string;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="/">Chess Openings</a>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/explore">Explore</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/practice/1">Practice</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/quiz">Quiz</a>
            </li>
          </ul>
        </div>
        </nav>
        { this.props.title ? 
        <header className="header">
            <Container className="h-100">
                <Row className="h-100 align-items-center">
                    <Col md="12" className="text-left">
                        <h1 className="font-weight-light">{this.props.title}</h1>
                    </Col>
                </Row>
            </Container> 
          </header>
          :  null } 
      </div>
    );
  }
}

export default Header;
