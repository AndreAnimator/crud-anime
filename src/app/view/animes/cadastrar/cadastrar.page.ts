import { Component, OnInit } from '@angular/core';
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
export class CadastrarPage implements OnInit {
  nome!: string;
  episodios! : number;
  genero! : number;
  temporada! : number;
  studio! : string;
  data! : number;
  public imagem! : any;
  public user! : any;
  formEntidade : FormGroup;

  constructor(private alertController: AlertController, private router : Router, private firebaseService : FirebaseService, private auth: AuthService, private formBuilder: FormBuilder, private utilService: UtilService) {
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
    this.formEntidade = this.formBuilder.group({
      nome: ['', [Validators.required]],
      episodios: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      genero: ['', [Validators.required]],
      temporada: [''],
      studio: [''],
      data: ['']
    })
  }

  cadastrarImagem(imagem: any){
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(!this.formEntidade.valid){
      //this.nome || !this.episodios || !this.genero
      if(this.formEntidade.value['episodios'] <= 0){
        this.utilService.presentAlert("Erro", "O campo episódios não pode ser negativo.");   
      }else{
        this.utilService.presentAlert("Erro", "Os campos nome, episódios e genero são obrigatórios.");
      }
    } 
    else{
      console.log("cadstrou eh");
      let novo : Anime = new Anime(this.formEntidade.value['nome'], this.formEntidade.value['episodios'], this.formEntidade.value['genero']);
      novo.uid = this.user.uid;
      novo.temporada = this.formEntidade.value['temporada'];
      novo.studio = this.formEntidade.value['studio']
      novo.data = this.formEntidade.value['data']
      if(this.imagem){
        console.log(this.imagem);
        console.log("Ola tou cadastrando com imagem");
        this.firebaseService.cadastrarCapa(this.imagem, novo);
        console.log("Terminei de cadastrar com imagem");
      }else{
        this.firebaseService.cadastrar(novo);
      }
      this.utilService.presentAlert("Sucesso", "Anime Cadastrado!");
      this.router.navigate(['/home']);
    }
  }

}