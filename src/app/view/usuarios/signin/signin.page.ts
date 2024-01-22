import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/common/util.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar : FormGroup;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private utilService: UtilService) {
    this.formLogar = new FormGroup({
      email: new FormControl, 
      senha: new FormControl
    })
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm(): boolean{
    if(!this.formLogar.valid){
      this.utilService.presentAlert("Erro", "Erro ao preencher os campos!");
      return false;
    }else{
      this.logar();
      return true;
    }
  }

  private logar(){
    this.authService.signIn(this.formLogar.value['email'], this.formLogar.value['senha'])
    .then((res)=>{
      this.utilService.dismissLoader();
      this.utilService.presentAlert("Olá", "Seja bem vindo!");
      this.router.navigate(["home"]); 
    })
    .catch((error)=>{
      this.utilService.dismissLoader();
      this.utilService.presentAlert("Login", "Erro ao logar");
      console.log(error.message);
    })
  }

  logarComGoogle(): void{
    this.authService.signInWithGoogle().then((res)=>{
      this.utilService.presentAlert("Olá", "Seja bem vindo!");
      this.router.navigate(["home"]);
    })
    .catch((error)=>{
      this.utilService.presentAlert("Login", "Erro ao logar");
      console.log(error.message);
    })
  }

  logarComGithub(): void{
    this.authService.signInWithGithub().then((res)=>{
      this.utilService.presentAlert("Olá", "Seja bem vindo!");
      this.router.navigate(["home"]);
    })
    .catch((error)=>{
      this.utilService.presentAlert("Login", "Erro ao logar");
      console.log(error.message);
    })
  }

  irParaSignUp(){
    this.router.navigate(["signup"]);
  }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
