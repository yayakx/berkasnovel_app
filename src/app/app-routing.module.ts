import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'ft',
    loadChildren: () => import('./ft/ft.module').then( m => m.FtPageModule)
  },
  {
    path: 'cari',
    loadChildren: () => import('./cari/cari.module').then( m => m.CariPageModule)
  },
  {
    path: 'fft/:kw',
    loadChildren: () => import('./fft/fft.module').then( m => m.FftPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'download',
    component: RedirectComponent, 
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
