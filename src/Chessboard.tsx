import React, { RefObject } from 'react';
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'
import { ChessInstance } from 'chess.js';
import ReactDOM from 'react-dom';

import './Chessground.css'

const Chess = require('chess.js')

export interface ChessboardProps extends React.HTMLProps<HTMLDivElement> {
  [key: string]: any;
  tag?: React.ReactType;
  
  fen?: string
}

class Chessboard extends React.Component<ChessboardProps> {
  
  private container : RefObject<HTMLDivElement>;

  private chess? : ChessInstance;

  private api? : Api;

  constructor(props: ChessboardProps) {
    super(props);

    this.container = React.createRef<HTMLDivElement>()
  }
  
  render() {
    return <div ref={this.container}/>;
  }

  componentDidMount() {
    const node = this.container.current as HTMLElement;

    this.chess = new Chess(this.props.fen);
    this.api = Chessground(node) ;
  }
}

export default Chessboard;
