import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FtPageRoutingModule } from './ft-routing.module';

import { FtPage } from './ft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FtPageRoutingModule
  ],
  declarations: [FtPage]
})
export class FtPageModule {}
