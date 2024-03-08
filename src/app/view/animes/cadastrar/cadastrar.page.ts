import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilService } from 'src/app/common/util.service';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastroComponent  implements OnInit {
  isInEditarPage : Boolean = false;
  anime!: Anime;
  nome!: string;
  episodios! : number;
  genero! : number;
  temporada! : number;
  studio! : string;
  data! : number;
  edicao: boolean = false;
  public imagem! : any;
  public user! : any;
  formEntidade : FormGroup;

  constructor(private alertController: AlertController, private router : Router, private firebaseService : FirebaseService, private auth: AuthService, private formBuilder: FormBuilder, private utilService: UtilService) {
    this.isInEditarPage = false;
    this.user = this.auth.getUserLogged();
    this.formEntidade = new FormGroup({
      nome: new FormControl,
      episodios: new FormControl,
      genero: new FormControl,
      temporada: new FormControl,
      studio: new FormControl,
      data: new FormControl
    })
  }

  get errorControl(){
    return this.formEntidade.controls;
  }

  ngOnInit() {
    this.isInEditarPage = false;
    this.formEntidade = this.formBuilder.group({
      nome: ['', [Validators.required]],
      episodios: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      genero: ['', [Validators.required]],
      temporada: [''],
      studio: [''],
      data: ['']
    })
  }

  habilitarEdicao(){
    if(this.edicao)
      this.edicao = false;
    else
      this.edicao = true;
  }

  excluir(){
    this.utilService.presentConfirmAlert("Atenção!", "Realmente deseja excluir?");
  }

  cadastrarImagem(imagem: any){
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(!this.formEntidade.valid){
      //this.nome || !this.episodios || !this.genero
      if(this.formEntidade.value['nome'] == ""){
        this.utilService.presentAlert("Erro.", "Nome não pode estar vázio");
      }
      else if(this.formEntidade.value['episodios'] <= 0){
        this.utilService.presentAlert("Erro.", "Episódios não pode ser 0 ou negativo.");
      }
      else if(this.formEntidade.value['genero'] == null){
        this.utilService.presentAlert("Erro.", "Gênero não pode estar vazio.");
      }
    } 
    else{
      this.utilService.simpleLoader();
      console.log("cadstrou eh");
      let novo : Anime = new Anime(this.formEntidade.value['nome'], this.formEntidade.value['episodios'], this.formEntidade.value['genero']);
      novo.uid = this.user.uid;
      novo.temporada = this.formEntidade.value['temporada'];
      novo.studio = this.formEntidade.value['studio']
      novo.data = this.formEntidade.value['data']
      if(this.imagem){
        console.log(this.imagem);
        console.log("Ola tou cadastrando com imagem");
        this.firebaseService.cadastrarCapa(this.imagem, novo).then(() => {
          this.utilService.dismissLoader();
        })
        .catch(error => {
          console.error(error);
        });
        console.log("Terminei de cadastrar com imagem");
      }else{
        this.firebaseService.cadastrar(novo).then(() => {
          this.utilService.dismissLoader();
        })
        .catch(error => {
          console.error(error);
        });
      }
      this.utilService.presentAlert("Sucesso", "Anime Cadastrado!");
      this.router.navigate(['/home']);
    }
  }

}
