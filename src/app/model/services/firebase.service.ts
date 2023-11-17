import { Injectable } from '@angular/core';
import { Anime } from '../entities/Anime';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private PATH : string = 'Animes';

  constructor(private angularFirestore: AngularFirestore, private storage : AngularFireStorage) { }

  buscarTodos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(anime : Anime){
    return this.angularFirestore.collection(this.PATH).add({nome: anime.nome, 
      episodios: anime.episodios, 
      genero: anime.genero,
      temporada: anime.temporada || null,
      studio: anime.studio || null,
      data: anime.data || null});
  }

  cadastrarComCapa(anime : Anime){
    return this.angularFirestore.collection(this.PATH).add({nome: anime.nome, 
      episodios: anime.episodios, 
      genero: anime.genero,
      temporada: anime.temporada || null,
      studio: anime.studio || null,
      data: anime.data || null,
      downloadURL: anime.downloadURL || null});
  }

  editarAnime(anime: Anime, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      nome: anime.nome,
      episodios: anime.episodios,
      genero: anime.genero,
      temporada: anime.temporada || null,
      studio: anime.studio || null,
      data: anime.data || null
    })
  }
  
  editarComCapa(anime: Anime, id: string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      nome: anime.nome,
      episodios: anime.episodios,
      genero: anime.genero,
      temporada: anime.temporada || null,
      studio: anime.studio || null,
      data: anime.data || null,
      downloadURL: anime.downloadURL || null
    })
  }

  excluirAnime(anime: Anime){
    return this.angularFirestore.collection(this.PATH)
    .doc(anime.id)
    .delete()
  }

  cadastrarCapa(imagem: any, anime: Anime){
    const file = imagem.item(0);
    if(file.type.split('/')[0] != 'image'){
      console.error('Tipo não Suporrtado!');
      return;
    }
    const path = `images/${anime.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(finalize(()=>{
      let uploadFileURL = fileRef.getDownloadURL();
      uploadFileURL.subscribe(resp => {
        anime.downloadURL = resp;
        if(!anime.id){
          this.cadastrarComCapa(anime);
        }else{
          this.editarComCapa(anime, anime.id);
        }
      })
    })).subscribe();
  }
}	