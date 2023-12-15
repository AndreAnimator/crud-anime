import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharPageRoutingModule } from './detalhar-routing.module';

import { DetalharPage } from './detalhar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharPageRoutingModule
  ],
  declarations: [DetalharPage]
})
export class DetalharPageModule {}
