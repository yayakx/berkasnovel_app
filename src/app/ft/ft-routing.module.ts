import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FtPage } from './ft.page';

const routes: Routes = [
  {
    path: '',
    component: FtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtPageRoutingModule {}
