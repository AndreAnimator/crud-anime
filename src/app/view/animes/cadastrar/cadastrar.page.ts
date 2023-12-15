import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
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
  public user! : any;

  constructor(private alertController: AlertController, private router : Router, private firebaseService : FirebaseService, private auth: AuthService) {
    this.user = this.auth.getUserLogged();
  }

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
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(!this.nome || !this.episodios || !this.genero){
      this.presentAlert("Erro", "Os campos nome, episódios e genero são obrigatórios.");
    }else if(this.episodios < 0){
      this.presentAlert("Erro", "O campo episódios não pode ser negativo.");   
    }
    else{
      console.log("cadstrou eh");
      let novo : Anime = new Anime(this.nome, this.episodios, this.genero);
      novo.uid = this.user.uid;
      if(this.imagem){
        console.log(this.imagem);
        console.log("Ola tou cadastrando com imagem");
        this.firebaseService.cadastrarCapa(this.imagem, novo);
        console.log("Terminei de cadastrar com imagem");
      }else{
        console.log(novo);
        novo.temporada = this.temporada;
        novo.studio = this.studio;
        novo.data = this.data;
        this.firebaseService.cadastrar(novo);
      }
      this.presentAlert("Sucesso", "Anime Cadastrado!");
      this.router.navigate(['/home']);
    }
  }

}