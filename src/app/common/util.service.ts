import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseService } from '../model/services/firebase.service';
import { Anime } from '../model/entities/Anime';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private alertController: AlertController, private loadingController: LoadingController, private firebaseService: FirebaseService, private router : Router) { }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Crud de Animes',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Confirm Alert',
      subHeader: subHeader,
      message: message,
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
            let anime: Anime = history.state.anime;;
            this.firebaseService.excluirAnime(anime);
            this.router.navigate(['/home']);
            console.log('Whatever');
          }
        }
      ]
    });
    await alert.present();
  }

  async simpleLoader(){
    await this.loadingController.dismiss();
    this.loadingController.create({
      message: 'Carregando'
    }).then((response) => {
      response.present();
    });
  }

  async dismissLoader(){
    while (await this.loadingController.getTop()) {
      this.loadingController.dismiss().then((response) => {
        console.log('Loader Fechado', response);
      });
    }
  }
}
