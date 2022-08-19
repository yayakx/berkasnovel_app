import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { PostsService } from '../services/post.service';
import { Ft } from '../ft/ft.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ft',
  templateUrl: './ft.page.html',
  styleUrls: ['./ft.page.scss'],
})
export class FtPage implements OnInit {
  fts$: Observable<Ft[]>;

  constructor(
    private postServices: PostsService,
    private loadingCtrl: LoadingController,
    private routes: Router
  ) { }

  kw: any;

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Loading...' });
    loading.present();

    this.fts$ = this.postServices.getFts().pipe(
      tap(fts => {
        loading.dismiss()
        return fts;
      })
    );
  }

  goHref(ft: Ft) {
    this.kw = ft.url_ft.replace('/feed', '').replace('/rss.xml', '').replace('http://', '').replace('https://', '');
    console.log(this.kw);
    this.routes.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.routes.navigate(['/fft', this.kw])
    );
  }

}
