import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
})
export class AnimeComponent  implements OnInit {
  @Input() anime: any;

  constructor() { }

  ngOnInit() {}

}
