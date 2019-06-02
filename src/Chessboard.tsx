import React, { RefObject } from 'react';
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'
import { ChessInstance, Square } from 'chess.js';

import './Chessground.css'
import { Key } from 'chessground/types';

const Chess = require('chess.js')

export interface ChessboardProps extends React.HTMLProps<HTMLDivElement> {
  [key: string]: any;
  tag?: React.ReactType;
  
  fen?: string,
  width?: string,
  height?: string
}

export class Chessboard extends React.Component<ChessboardProps> {
  
  private container : RefObject<HTMLDivElement>;

  private chess? : ChessInstance;

  private api? : Api;

  constructor(props: ChessboardProps) {
    super(props);

    this.container = React.createRef<HTMLDivElement>()

    this.computeMoves = this.computeMoves.bind(this);
    this.flipColor = this.flipColor.bind(this);
    this.toDests = this.toDests.bind(this);
  }
  
  toDests() {
    var dests: { [from: string]: Square[] ; } = {};
    this.chess!.SQUARES.forEach(s => {
      const ms = this.chess!.moves({square: s, verbose: true});
      if (ms.length) dests[s] = ms.map(m => m.to);
    });
    return dests;
  }

  flipColor() {
    return (this.chess!.turn() === 'w') ? 'white' : 'black';
  }

  computeMoves(orig: Key, dest: Key) {
      this.chess!.move({from: orig as Square, to: dest as Square});
      this.api!.set({
        turnColor: this.flipColor(),
        movable: {
          color: this.flipColor(),
          dests: this.toDests()
        }
      });
  }

  render() {
    return (
      <div className="merida" style={{
        "width": this.props.width || "320px",
        "height": this.props.height || "320px"
      }}>
        <div ref={this.container}/>
      </div>
    );
  }

  componentDidMount() {
    const node = this.container.current as HTMLElement;
    
    node.style.width = this.props.width || "320px"
    node.style.height = this.props.height || "320px"

    this.chess = new Chess(this.props.fen);
    this.api = Chessground(node, {
      movable: {
        color: 'white',
        free: false,
        dests: this.toDests(),
        events: { after: this.computeMoves }
      },
      draggable: {
        showGhost: true
      },
      fen: this.props.fen
    });
  }
}

export default Chessboard;
