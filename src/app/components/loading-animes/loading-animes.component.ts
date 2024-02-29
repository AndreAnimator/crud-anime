import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-animes',
  templateUrl: './loading-animes.component.html',
  styleUrls: ['./loading-animes.component.scss'],
})
export class LoadingAnimesComponent  implements OnInit {
  dummy = Array(10);

  constructor() { }

  ngOnInit() {}

}
