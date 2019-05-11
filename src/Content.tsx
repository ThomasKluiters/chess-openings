import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import {
    DRILL_DESCRIPTION_TEXT,
    EXPLORE_DESCRIPTION_TEXT,
    QUIZ_DESCRIPTION_TEXT
} from './Constants'

import './Content.css';

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
  
    title?: string,
    description? :string,
    image?: string
  }

class Card extends React.Component<CardProps> {
    render() {
         return (
         <Col md="3" className="card col-md-offset-1">
            <h2 className="font-weight-light">{this.props.title}</h2>
            <p className="font-weigeht-light">{this.props.description}</p>
            <span className={"glyphicon glyphicon-" + this.props.image}></span>
        </Col>
        )
    }
  }

const Content: React.FC = () => {
  return (
    <section>
        <Container className="text-center content">
            <Row className="md-16">
                <Card 
                    title="Explore"
                    image="search"
                    description={EXPLORE_DESCRIPTION_TEXT}
                ></Card>
                <Card 
                    title="Drill"
                    image="book"
                    description={DRILL_DESCRIPTION_TEXT}
                ></Card>
                <Card
                    title="Quiz" 
                    image="ok-circle"
                    description={QUIZ_DESCRIPTION_TEXT}
                ></Card>
            </Row>
        </Container>
    </section>
  );
}

export default Content;
