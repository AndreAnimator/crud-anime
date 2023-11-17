import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  temporada! : number;
  studio! : string;
  data! : number;
  public imagem! : any;

  constructor(private alertController: AlertController, private router : Router, private firebaseService : FirebaseService) { }

  async presentAlert(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
  }

  cadastrarImagem(imagem: any){
    this.imagem = imagem;
  }

  cadastrar(){
    if(!this.nome || !this.episodios || !this.genero){
      this.presentAlert("Erro", "Os campos nome, episódios e genero são obrigatórios.");
    }else if(this.episodios < 0){
      this.presentAlert("Erro", "O campo episódios não pode ser negativo.");   
    }
    else{
      this.presentAlert("Sucesso", "Anime Cadastrado!");
      console.log("cadstrou eh");
      let novo : Anime = new Anime(this.nome, this.episodios, this.genero);
      if(this.imagem){
        this.firebaseService.cadastrarCapa(this.imagem, novo);
      }else{
        console.log(novo);
        novo.temporada = this.temporada;
        novo.studio = this.studio;
        novo.data = this.data;
        this.firebaseService.cadastrar(novo);
      }
      this.router.navigate(['/home']);
    }
  }

}