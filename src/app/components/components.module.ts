import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeComponent } from './anime/anime.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingAnimesComponent } from './loading-animes/loading-animes.component';
import { IonicModule } from '@ionic/angular';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AnimeComponent, EmptyScreenComponent, LoadingAnimesComponent, CadastroComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [AnimeComponent, EmptyScreenComponent, LoadingAnimesComponent, CadastroComponent]
})
export class ComponentsModule { }
