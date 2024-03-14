import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/common/util.service';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CadastroComponent)
  }]
})
export class CadastroComponent  implements OnInit {
  @Input() formEntidade: FormGroup;
  @Input() onSubmit: () => void;
  @Input() onImageChange: (event: any) => void
  @Input() editar: Boolean;
  @Input() anime: any;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router : Router, private utilService: UtilService,  private firebaseService : FirebaseService) {
    
  }

  cadastrar() {
    if (this.onSubmit) {
      this.onSubmit();
    }
  }

  cadastrarImagem(event: any) {
    if (this.onImageChange) {
      this.onImageChange(event);
    }
  }

  ngOnInit() {
  }
}
