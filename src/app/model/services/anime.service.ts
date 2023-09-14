import { Injectable } from '@angular/core';
import { Anime } from '../entities/Anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private lista_animes : Anime[] = [];

  constructor() { 
    let c1 : Anime = new Anime("One Piece", 1075, 1);
    c1.temporada = 0;
    c1.studio = "Toei Animation";
    c1.data = 20101999;
    let c2 : Anime = new Anime("Jujutsu Kaisen 2", 7, 1);
    c2.temporada = 1;
    c2.studio = "MAPPA";
    c2.data = 0o6072023;
    let c3 : Anime = new Anime("Kaguya-sama", 12, 2);
    c3.temporada = 3;
    c3.studio = "A-1 Pictures";
    c3.data = 12012019;
    let c4 : Anime = new Anime("Mahou Shoujo Madoka★Magica", 12, 3);
    c4.temporada = 3;
    c4.studio = "Shaft";
    c4.data = 0o7012011;
    this.lista_animes.push(c1);
    this.lista_animes.push(c2);
    this.lista_animes.push(c3);
    this.lista_animes.push(c4);
  }

  public obterTodos() : Anime[]{
    return this.lista_animes;
  }

  public obterPorIndice(indice : number): Anime{
    return this.lista_animes[indice];
  }

  public cadastrar(anime: Anime){
    this.lista_animes.push(anime);
  }

  public editar(anime: Anime, indice: number){
    this.lista_animes[indice] = anime;
  }

  public excluir(indice: number){
    this.lista_animes.splice(indice, 1);
  }
}
