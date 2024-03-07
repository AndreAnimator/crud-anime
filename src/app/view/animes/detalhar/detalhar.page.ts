import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  isInEditarPage: boolean = true;

  constructor() {
    this.isInEditarPage = true;
  }

  ngOnInit() {
    this.isInEditarPage = true;
  }
}