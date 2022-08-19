import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FftPage } from './fft.page';

const routes: Routes = [
  {
    path: '',
    component: FftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FftPageRoutingModule {}
