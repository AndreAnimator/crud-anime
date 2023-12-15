import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  anime!: Anime;
  nome!: string;
  episodios! : number;
  genero! : number;
  temporada! : number;
  studio! : string;
  data! : number;
  indice! : string;
  edicao: boolean = true;
  public imagem: any;
  user : any;

  constructor(private alertController: AlertController, private router : Router, private firebaseService: FirebaseService, private auth: AuthService) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.anime = history.state.anime;
    console.log(this.anime);
    this.nome = this.anime.nome;
    this.episodios = this.anime.episodios;
    this.genero = this.anime.genero;
    this.temporada = this.anime.temporada;
    this.studio = this.anime.studio;
    this.data = this.anime.data;
  }

  async presentAlert(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Confirm Alert',
      subHeader: 'Atenção',
      message: 'Deseja excluir esse anime?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Let me think');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.firebaseService.excluirAnime(this.anime);
            this.router.navigate(['/home']);
            console.log('Whatever');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertEdicao(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Confirm Alert',
      subHeader: 'Erro!',
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Let me think');
          }
        }
      ]
    });
    await alert.present();
  }

  habilitarEdicao(){
    if(this.edicao)
      this.edicao = false;
    else
      this.edicao = true;
  }

  excluir(){
    this.presentAlert("Atenção!", "Realmente deseja excluir?");
  }

  cadastrarImagem(imagem: any){
    this.imagem = imagem.files;
  }

  editar(){
    //validações de inputs
    if(this.nome == ""){
      this.presentAlertEdicao("Erro.", "Nome não pode estar vázio");
    }
    else if(this.episodios <= 0){
      this.presentAlertEdicao("Erro.", "Episódios não pode ser 0 ou negativo.");
    }
    else if(this.genero == null){
      this.presentAlertEdicao("Erro.", "Gênero não pode estar vazio.");
    }
    else{
      let novo : Anime = new Anime(this.nome, this.episodios, this.genero);
      novo.id = this.anime.id;
      novo.uid = this.user.uid;
      novo.temporada = this.temporada;
      novo.studio = this.studio;
      novo.data = this.data;
      if(this.imagem){
        
        this.firebaseService.cadastrarCapa(this.imagem, novo);
      }else{
        this.firebaseService.editarAnime(novo, this.anime.id);
      }
      this.router.navigate(['/home']);
    }
  }

}