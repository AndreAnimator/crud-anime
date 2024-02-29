import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeComponent } from './anime/anime.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingAnimesComponent } from './loading-animes/loading-animes.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AnimeComponent, EmptyScreenComponent, LoadingAnimesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AnimeComponent, EmptyScreenComponent, LoadingAnimesComponent]
})
export class ComponentsModule { }
