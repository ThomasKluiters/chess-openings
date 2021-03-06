import { throwStatement } from "@babel/types";

export default class Eco {

    private _id: string

    private _moves: string
    
    private _name : string

    private _eco: string

    private _fen: string

    constructor(c : string, n : string, f : string, id : string, m : string) {
        this._moves = m
        this._name = n
        this._eco = c
        this._fen = f
        this._id = id
    }

    static of(item : any) {
        return new Eco(
            item.eco,
            item.name,
            item.fen,
            item.id,
            item.moves
        )
    }

    public get id() : string {
        return this._id
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

    public get moves() : string {
        return this._moves
    }

    public get count() : number {
        return this._moves.split(" ").length
    }

    public move(n: number) : string {
        return this._moves.split(" ")[n]
    }
}