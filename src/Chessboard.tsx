import React, { RefObject } from 'react';
import { Chessground } from 'chessground'
import { Api } from 'chessground/api'
import { Key, Piece } from 'chessground/types';
import { configure } from 'chessground/config'
import { defaults, State } from 'chessground/state'
import { ChessInstance, Square } from 'chess.js';

import './Chessground.css'

const Chess = require('chess.js')

export interface ChessboardProps extends React.HTMLProps<HTMLDivElement> {
  [key: string]: any;
  tag?: React.ReactType;
  
  fen?: string,
  width?: string,
  height?: string,

  onMove?: (api: Api, chess: ChessInstance, orig: Key, dest: Key) => void
}

export class Chessboard extends React.Component<ChessboardProps> {
  
  private container = React.createRef<HTMLDivElement>();

  private chess? : ChessInstance;

  private api? : Api;

  constructor(props: ChessboardProps) {
    super(props);

    this.computeMoves = this.computeMoves.bind(this);
    this.flipColor = this.flipColor.bind(this);
    this.toDests = this.toDests.bind(this);
    this.orient = this.orient.bind(this);
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

  move(orig: Key, dest: Key) {
    this.computeMoves(orig, dest)
    this.api!.move(orig, dest)
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

    if (this.props.onMove) {
      this.props.onMove(this.api!, this.chess!, orig, dest);
    }
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

  reset() {
    const node = this.container.current as HTMLElement
    
    this.chess = new Chess(this.props.fen);
    this.api = Chessground(node, {
      orientation: this.api ? this.api.state.orientation : 'white',
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

  orient(color: string) {
    if (!this.api!.state.orientation.startsWith(color)) {
      this.api!.toggleOrientation()
    }
  }

  componentDidMount() {
    const node = this.container.current as HTMLElement;
    
    node.style.width = this.props.width || "320px"
    node.style.height = this.props.height || "320px"

    this.reset()
  }
}

export default Chessboard;
