import React from 'react';
import { Container, Row } from 'reactstrap';
import Card from './Card'
import {
    DRILL_DESCRIPTION_TEXT,
    EXPLORE_DESCRIPTION_TEXT,
    QUIZ_DESCRIPTION_TEXT
} from './Constants'

import './Cards.css';


const Cards: React.FC = () => {
  return (
    <section>
        <Container className="text-center content">
            <Row>
                <Card 
                    link="/explore"
                    title="Explore"
                    image="search"
                    description={EXPLORE_DESCRIPTION_TEXT}
                ></Card>
                <Card 
                    link="/practice/1"
                    title="Drill"
                    image="book"
                    description={DRILL_DESCRIPTION_TEXT}
                ></Card>
                <Card
                    link="/quiz"
                    title="Quiz" 
                    image="check"
                    description={QUIZ_DESCRIPTION_TEXT}
                ></Card>
            </Row>
        </Container>
    </section>
  );
}

export default Cards;
