import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom';
import { ChessInstance } from 'chess.js';
import { Chessboard } from './Chessboard'
import { Route } from 'react-router-dom';
import { Key } from 'chessground/types';
import React, { RefObject } from 'react';
import axios from 'axios'
import Eco from './Eco'


interface PracticeBoardProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
    
    id: string
 }

 interface PracticeBoardState {
     move: number,
     eco?: Eco;
 }

 interface PracticeProps extends RouteComponentProps, React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
}

interface PracticeState {
    item?: Eco
}


class PracticeBoard extends React.Component<PracticeBoardProps, PracticeBoardState> {
    
    private board = React.createRef<Chessboard>();
    
    constructor(props: PracticeBoardProps) {
        super(props);

        this.state = {
            eco: undefined,
            move: 0
        }

        this.isMovePartOfOpening = this.isMovePartOfOpening.bind(this)
    }

    isMovePartOfOpening(chess: ChessInstance, orig: Key, dest: Key): void {
        if(orig + dest == this.state.eco!.moves.split(" ")[this.state.move]) {
            this.setState({
                move: this.state.move + 1
            })
        } else {
            this.board.current!.reset()
            this.setState({
                move: 0
            })
        }
    }

    render() {
         return (
            <div>
                { this.state.eco ? <h3 style = {{ "textAlign": "center" }}>{ this.state.eco.name }</h3> : null}
                <Chessboard ref={this.board as any} onMove={ this.isMovePartOfOpening } width="400px" height="400px"></Chessboard>
             </div>
        )
    }

    _fetchOpening(id: string) {
        axios.get("/eco.json").then(response => {
            const item = response.data.find((x : Eco) => x.id == id)

            console.log(item.moves)

            this.setState({
                eco: item,
                move: 0
            })
        })
    }

    componentDidMount() {
        this._fetchOpening(this.props.id)
    }
}

class Practice extends React.Component<PracticeProps, PracticeState> {      
    constructor(props: PracticeProps) {
        super(props);

        this.state = {
            item: undefined
        }
    }

    render(){ 
        
        return (
            <Route path="/practice" render={ () => 
                <PracticeBoard id={ this.props.location.pathname.split("/")[2] }></PracticeBoard>
            }/>
        )
    }

}
  
export default withRouter(Practice);