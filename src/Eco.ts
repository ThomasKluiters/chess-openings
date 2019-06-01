export default class Eco {
    
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