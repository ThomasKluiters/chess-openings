import React from 'react';
import { Col } from 'reactstrap'
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";


export interface CardProps extends RouteComponentProps, React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
    
    description :string,
    title: string,
    image: string,
    link: string
  }

class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push(this.props.link)
    }

    render() {
         return (
         <Col md="3" className="card col-md-offset-1" onClick={this.handleClick} style ={{
             margin: "2%"
         }}>
            <h2 className="font-weight-light">{this.props.title}</h2>
            <p className="font-weigeht-light">{this.props.description}</p>
            <span className={"fa fa-" + this.props.image}></span>
        </Col>
        )
    }
}

export default withRouter(Card);