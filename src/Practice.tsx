import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom';
import { ChessInstance } from 'chess.js';
import { Chessboard } from './Chessboard'
import { Route } from 'react-router-dom';
import { Key } from 'chessground/types';
import React, { RefObject } from 'react';
import { Api } from 'chessground/api'
import axios from 'axios'
import Eco from './Eco'
import Header from './Header'
import { Button, Row, Col } from 'reactstrap';
import './Practice.css'


interface PracticeBoardProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
    
    id: string,
    side?: 'w' | 'b'
 }

 interface PracticeBoardState {
    side?: string,
    move: number,
    eco?: Eco
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
            side: undefined,
            eco: undefined,
            move: 0
        }

        this.isMovePartOfOpening = this.isMovePartOfOpening.bind(this);
        this.playAsBlack = this.playAsBlack.bind(this);
        this.playAsWhite = this.playAsWhite.bind(this);
        this.completed = this.completed.bind(this);
        this.next = this.next.bind(this);
        this.play = this.play.bind(this);
    }

    isMovePartOfOpening(api: Api, chess: ChessInstance, orig: Key, dest: Key): void {
        if (!this.state.eco) {
            return;
        }

        if(orig + dest === this.state.eco.move(this.state.move)) {
            this.setState({
                move: this.state.move + 1
            })

            if (chess.turn() == this._opposite(this.state.side) && this.state.eco.count > this.state.move) {
                this.next();
            }
        } else {
            this.reset();
        }
    }

    playAsBlack() {
        this.board.current!.orient('b')
        this.setState({
            side: 'b'
        }, this.reset)
    }

    playAsWhite() {
        this.board.current!.orient('w')
        this.setState({
            side: 'w'
        }, this.reset)
    }

    render() {
         return (
            <div>
                <h3 style = {{ "textAlign": "center" }}>{ this.state.eco ? this.state.eco.name : "Loading name" }</h3>
                <Chessboard ref={this.board as any} onMove={ this.isMovePartOfOpening } width="400px" height="400px"></Chessboard>
                <div className="practice-button-container">
                    <Button onClick={ this.playAsBlack } className="practice-button">Practice with black pieces</Button>
                    <Button onClick={ this.playAsWhite } className="practice-button">Practice with white pieces</Button>
                </div>
             </div>
        )
    }

    next() {
        if (this.state.eco) {
            if (!this.completed()) {
                const move = this.state.eco.move(this.state.move)
                if (this.board.current) {
                    this.board.current.move(move.substr(0, 2) as Key, move.substr(2, 4) as Key)
                }
            } else {
                this.reset()
            }
        }
    }

    play() {
        const playOneMove = () => {
            if (!this.state.side) {
                this.next()
                setTimeout(playOneMove, 1000);
            };
        }
        playOneMove();
    }

    completed() : boolean {
        return this.state.eco !== undefined && this.state.move >= this.state.eco.count
    }

    reset() {
        if (this.board.current) {
            this.board.current.reset()
        }

        this.setState({
            move: 0
        }, () => {
            if (this.state.side === 'b') {
                this.next();
            }
        })
    }

    _opposite(side?: string) {
        if (side === 'w') return 'b'
        if (side === 'b') return 'w'
        return side
    }

    _fetchOpening(id: string) {
        axios.get("/eco.json").then(response => {
            const item = response.data.find((x : Eco) => x.id == id)

            this.setState({
                eco: new Eco(
                    item.eco,
                    item.name,
                    item.fen,
                    item.id,
                    item.moves
                ),
                move: 0
            }, () => {
                if (!this.state.side) {
                    this.play();
                }
            })
        })
    }

    componentDidMount() {
        this.setState({
            eco: this.state.eco,
            side: this.props.side,
            move: this.state.move
        })

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
                <div>
                    <Header title=""></Header>
                    <PracticeBoard id={ this.props.location.pathname.split("/")[2] }></PracticeBoard>
                </div>
            }/>
        )
    }

}
  
export default withRouter(Practice);