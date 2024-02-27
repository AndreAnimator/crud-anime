import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/common/util.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar : FormGroup;

  constructor(private router: Router, private authService : AuthService, private formBuilder: FormBuilder, private utilService: UtilService) {
    this.formCadastrar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    })
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(): boolean{
    if(!this.formCadastrar.valid){
      this.utilService.presentAlert("Erro", "Erro ao preencher os campos!");
      return false;
    }else{
      this.cadastrar();
      return true;
    }
  }

  private cadastrar(){
    this.authService.signUpWithEmailPassword(this.formCadastrar.value['email'], this.formCadastrar.value['senha'])
    .then((res)=>{
      this.utilService.presentAlert("Cadastro", "Cadastro realizado com sucesso");
      this.router.navigate(["signin"]);
    })
    .catch((error)=>{
      this.utilService.presentAlert("Cadastro", "Erro ao cadastrar");
      console.log(error.message);
    })
  }

  irParaSignIn(){
    this.router.navigate(["signin"]);
  }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
