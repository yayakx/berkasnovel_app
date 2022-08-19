import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FftPageRoutingModule } from './fft-routing.module';

import { FftPage } from './fft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FftPageRoutingModule,
  ],
  declarations: [FftPage]
})
export class FftPageModule {}
