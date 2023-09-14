export class Anime {
    private _id!: string;
    private _nome!: string;
    private _episodios!: number;
    private _genero!: number;
    private _temporada!: number;
    private _studio!: string;
    private _data!: number;

    constructor(nome: string, episodios: number, genero: number){
        this._nome = nome;
        this._episodios = episodios;
        this._genero = genero;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    public get episodios(): number {
        return this._episodios;
    }
    public set episodios(value: number) {
        this._episodios = value;
    }

    public get genero(): number {
        return this._genero;
    }
    public set genero(value: number) {
        this._genero = value;
    }

    public get temporada(): number {
        return this._temporada;
    }
    public set temporada(value: number) {
        this._temporada = value;
    }

    public get studio(): string {
        return this._studio;
    }
    public set studio(value: string) {
        this._studio = value;
    }

    public get data(): number {
        return this._data;
    }
    public set data(value: number) {
        this._data = value;
    }
}
