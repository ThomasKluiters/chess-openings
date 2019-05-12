import React from 'react';
import Chessground from 'chessground'
import { Route } from 'react-router-dom';
import { Chess } from 'chess.js';

export interface ChessboardProps extends React.HTMLProps<HTMLDivElement> {
  [key: string]: any;
  tag?: React.ReactType;
  
  fen?: string
}

class Chessboard extends React.Component<ChessboardProps> {
  
  constructor(props: ChessboardProps) {
    super(props);
  }

  render() {
    return <p></p>
  }
}

export default Chessboard;