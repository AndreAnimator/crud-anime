import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent  implements OnInit {
  @Input() model: any;

  constructor() { }

  ngOnInit() {}

}
