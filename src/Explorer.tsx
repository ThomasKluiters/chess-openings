import React, { ChangeEvent, MouseEvent } from 'react';
import axios from 'axios'
import { Chessboard } from './Chessboard'
import { Col, Row, Container } from 'reactstrap'

import './Explorer.css'

export interface ExplorerCardProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;

    eco: Eco;
}

export interface ExplorerItemProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;

    eco: Eco;
}


export interface ExplorerProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
}

interface ExplorerState {
    items: Eco[]
}

class Eco {
    
    private _moves: string
    
    private _name : string

    private _eco: string

    private _fen: string

    constructor(name : string, eco : string, fen : string, moves : string) {
        this._moves = moves
        this._name = name
        this._eco = eco
        this._fen = fen
    }

    public get name() : string {
        return this._name
    }

    public get fen() : string {
        return this._fen
    }

    public get eco() : string {
        return this._eco
    }
}

class ExplorerItem extends React.Component<ExplorerItemProps> {
    constructor(props: ExplorerCardProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event: MouseEvent) {
        console.log(this.props.eco.fen)
    }

    render() {
        return (
            <li className="list-group-item opening-item">{ this.props.eco.name }</li>
        )
    }
}

class ExplorerCard extends React.Component<ExplorerCardProps> {
    constructor(props: ExplorerCardProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event: MouseEvent) {
        console.log(this.props.eco.fen)
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

class Explorer extends React.Component<ExplorerProps, ExplorerState> {

    constructor(props : ExplorerProps) {
        super(props);

        this.state = {
            items: []
        }
    
        this.handleQuery = this.handleQuery.bind(this);
        this.fetchOpenings = this.fetchOpenings.bind(this)
    }

    fetchOpenings(name: string) {
        const query = name.toLowerCase()

        axios.get("/eco.json").then(response => {
            const items = response.data.filter((eco : Eco) => {
                return eco.name.toLowerCase().indexOf(query) != -1
            })

            this.setState(state => {
                return {
                    items: items
                }
            })
        })
    }

    handleQuery(event: ChangeEvent<HTMLInputElement>) {
        this.fetchOpenings(event.target.value)
    }


      
    render() {
         return (
             <Container>
                 <Row>
                    <Col md="8">
                        { this.state.items.slice(0, 4).map(value => {
                            return (
                                <ExplorerCard key={ value.fen } eco={ value }></ExplorerCard>
                            )
                        })}
                    </Col>
                    <Col md="4">
                        <div className="md-form mt-0">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleQuery}/>
                        <ul className="list-group">
                            { this.state.items.slice(0, 26).map(value => {
                                return <ExplorerItem key= {value.fen } eco = { value }></ExplorerItem>
                            }) }
                        </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Explorer;