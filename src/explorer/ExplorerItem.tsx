import React, { MouseEvent } from 'react';
import ExplorerLinkProps from './ExplorerLinkProps'
import { withRouter } from 'react-router-dom';


class ExplorerItem extends React.Component<ExplorerLinkProps> {
    constructor(props: ExplorerLinkProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event: MouseEvent) {
        this.props.history.push(`practice/${this.props.eco.id}`)
    }

    render() {
        return (
            <li className="list-group-item opening-item" onClick={ this.handleClick }>{ this.props.eco.name }</li>
        )
    }
}

export default withRouter(ExplorerItem)