import React, { MouseEvent } from 'react';
import { Col } from 'reactstrap'
import ExplorerLinkProps from './ExplorerLinkProps'
import Chessboard from '../Chessboard'
import { withRouter } from 'react-router-dom';


class ExplorerCard extends React.Component<ExplorerLinkProps> {
    constructor(props: ExplorerLinkProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event: MouseEvent) {
        this.props.history.push(`practice/${this.props.eco.id}`)
    }

    render() {
        return (
            <Col md="6" style={( { 
                padding: "30px",
                textAlign: "center",
                transition: "margin .5"
            } )} className="opening-card" onClick={ this.handleClick }>
                <Chessboard fen={ this.props.eco.fen } width="260px" height="260px"></Chessboard>
                <h3 style={( { paddingTop: "20px" }) }>{ this.props.eco.name }</h3>
            </Col>
        )
    }
}

export default withRouter(ExplorerCard)