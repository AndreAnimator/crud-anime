import { Injectable } from '@angular/core';
import { Anime } from '../entities/Anime';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private PATH : string = 'Animes';

  constructor(private angularFirestore: AngularFirestore) { }

  buscarTodos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(anime : Anime){
    return this.angularFirestore.collection(this.PATH)
    .add({nome: anime.nome, episodios: anime.episodios, genero: anime.genero});
  }

  editarAnime(anime: Anime, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      nome: anime.nome,
      episodios: anime.episodios,
      genero: anime.genero
    })
  }

  excluirAnime(anime: Anime){
    return this.angularFirestore.collection(this.PATH)
    .doc(anime.id)
    .delete()
  }

}	