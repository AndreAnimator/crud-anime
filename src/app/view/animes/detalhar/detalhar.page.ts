import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilService } from 'src/app/common/util.service';
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
  edicao: boolean = false;
  public imagem: any;
  user : any;
  formEntidade : FormGroup;

  constructor(private alertController: AlertController, private router : Router, private firebaseService: FirebaseService, private auth: AuthService, private formBuilder: FormBuilder, private utilService: UtilService) {
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

  ngOnInit() {
    this.anime = history.state.anime;
    this.edicao = true;
    console.log(this.anime);
    this.formEntidade = this.formBuilder.group({
      nome: [this.anime.nome, [Validators.required]],
      episodios: [this.anime.episodios, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      genero: [this.anime.genero, [Validators.required]],
      temporada: [this.anime.temporada],
      studio: [this.anime.studio],
      data: [this.anime.data]
    })
  }

  get errorControl(){
    return this.formEntidade.controls;
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

  editar(){
    //validações de inputs
    if(!this.formEntidade.valid){
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
      let novo : Anime = new Anime(this.formEntidade.value['nome'], this.formEntidade.value['episodios'], this.formEntidade.value['genero']);
      novo.id = this.anime.id;
      novo.uid = this.user.uid;
      novo.temporada = this.formEntidade.value['temporada'];
      novo.studio = this.formEntidade.value['studio'];
      novo.data = this.formEntidade.value['data'];
      if(this.imagem){
        
        this.firebaseService.cadastrarCapa(this.imagem, novo);
      }else{
        this.firebaseService.editarAnime(novo, this.anime.id);
      }
      this.utilService.presentAlert("Sucesso", "Anime Editado!");
      this.router.navigate(['/home']);
    }
  }

}