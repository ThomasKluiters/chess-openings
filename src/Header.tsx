import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
        <Container className="h-100">
            <Row className="h-100 align-items-center">
                <Col md="12" className="text-left">
                    <h1 className="font-weight-light">Chess Opening Practice</h1>
                </Col>
            </Row>
        </Container>        
    </header>
  );
}

export default Header;
