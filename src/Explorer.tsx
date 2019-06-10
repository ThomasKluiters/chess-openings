import React, { ChangeEvent } from 'react';
import axios from 'axios'
import { Col, Row, Container } from 'reactstrap'
import Eco from './Eco'

import './Explorer.css'

import Header from './Header';
import ExplorerCard from './explorer/ExplorerCard'
import ExplorerItem from './explorer/ExplorerItem'

export interface ExplorerProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
}

interface ExplorerState {
    items: Eco[]
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
                return eco.name.toLowerCase().indexOf(query) !== -1
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
             <div>
                <Header title="Opening Explorer"></Header>
                <Container className="explorer-content">
                    <Row>
                        <Col>
                            <div className="md-form mt-0">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleQuery}/>
                            <ul className="list-group">
                                { this.state.items.slice(0, 26).map(value => {
                                    return <ExplorerItem key= {value.fen } eco = { value }></ExplorerItem>
                                }) }
                            </ul>
                            </div>
                        </Col>
                        <Col md="8">
                            <Row>
                            { this.state.items.slice(0, 4).map(value => {
                                return (
                                    <ExplorerCard key={ value.fen } eco={ value }></ExplorerCard>
                                )
                            })}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    componentDidMount() {
        this.fetchOpenings("");
    }
}

export default Explorer;