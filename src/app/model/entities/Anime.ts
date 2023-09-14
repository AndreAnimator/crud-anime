export class Anime {
    private _id!: string;
    private _nome!: string;
    private _episodios!: number;
    private _genero!: number;
    private _temporada!: string;
    private _studio!: string;
    private _data!: number;

    constructor(nome: string, episodios: number, genero: number){
        this._nome = nome;
        this._episodios = episodios;
        this._genero = genero;
    }
}
