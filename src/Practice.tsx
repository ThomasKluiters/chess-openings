import React, { ChangeEvent } from 'react';
import { Chessboard } from './Chessboard'
import { Col, Row, Container } from 'reactstrap'

class Practice extends React.Component {      
    render() {
         return (
             <Container>
                <Chessboard></Chessboard>
            </Container>
        )
    }
}

export default Practice;