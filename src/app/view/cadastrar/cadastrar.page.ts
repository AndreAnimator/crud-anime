import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Anime } from 'src/app/model/entities/Anime';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome!: string;
  episodios! : number;
  genero! : number;
  temporada! : string;
  studio! : string;
  data! : number;

  constructor(private router : Router,
     private firebaseService : FirebaseService) { }

  ngOnInit() {
  }

  cadastrar(){
    let novo : Anime = new Anime(this.nome, this.episodios, this.genero);
    novo.temporada = this.temporada;
    novo.studio = this.studio;
    novo.data = this.data;
    this.firebaseService.cadastrar(novo);
    this.router.navigate(['/home']);
  }

}