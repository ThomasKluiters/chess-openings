import React, { ChangeEvent } from 'react';
import { Chessboard } from './Chessboard'
import { Route } from 'react-router-dom';
import axios from 'axios'
import { Col, Row, Container } from 'reactstrap'
import Eco from './Eco'


interface PracticeBoardProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
    
    eco: Eco;
 }

 interface PracticeProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
}

interface PracticeState {
    item?: Eco
}

class PracticeBoard extends React.Component<PracticeBoardProps> {      
    constructor(props: PracticeBoardProps) {
        super(props);
    }

    render() {
         return (
             <Chessboard width="400px" height="400px"></Chessboard>
        )
    }
}

class Practice extends React.Component<PracticeProps, PracticeState> {      
    constructor(props: PracticeBoardProps) {
        super(props);

        this.state = {
            item: undefined
        }
    }

    _fetchOpening() {
        axios.get("/eco.json").then(response => {
            const item = response.data[0];
            
            this.setState({
                item: item
            })
        })
    }


    render(){ 
        return (
            <Route path="/practice" render={ () => 
                this.state.item ? <PracticeBoard eco={ this.state.item }></PracticeBoard> : null
            }/>
        )
    }

    componentDidMount() {
        this._fetchOpening()
    }
}
  
export default Practice;