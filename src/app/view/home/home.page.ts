import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/model/entities/Anime';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lista_animes: Anime[] = [];

  constructor(private router : Router,
   private firebaseService: FirebaseService) {
    this.firebaseService.buscarTodos()
    .subscribe(res => {
      this.lista_animes = res.map(anime => {
        return{
          id: anime.payload.doc.id,
          ...anime.payload.doc.data()as any
        }as Anime;
      })
    })

  }

  irParaCadastrarPage(){
    this.router.navigate(['/cadastrar']);
  }

  editar(anime: Anime){
    this.router.navigateByUrl("/editar",
    {state: {anime:anime}});
  }

}