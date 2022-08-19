import { Component, OnInit, ViewChild } from '@angular/core';
import { IonImg, LoadingController, ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { FtPage } from '../ft/ft.page';
import { PostsService } from '../services/post.service';
import { DetailComponent } from '../detail/detail.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Fft } from './fft.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-post',
  templateUrl: './fft.page.html',
  styleUrls: ['./fft.page.scss'],
})
export class FftPage implements OnInit {
  posts$: Observable<Fft[]>;
  trial = new Date("3/31/2022");
  todayDate = new Date();
  url: string;
  itemListData = [];
  page = 1;
  a = 8;
  cekCari: any;
  loading;
  kw: any;
  alertQ: any;
  checkMobile;
  completed = false;


  constructor(
    private postServices: PostsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private Ft: FtPage,
    private AlertCtrl: AlertController,
    private routes: ActivatedRoute,
    private route: Router,
    public sanitizer: DomSanitizer,
    public plt: Platform,

  ) { }

  addHistory(post) {
    console.log(post);
    this.postServices.addHistory(post);
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
  showImage(src) {
    return this.sanitizer.bypassSecurityTrustUrl(src)
  }

  handleImageError(e) {
    e.isSHOW = true;
  }

  getDataPost(isFirstLoad, event) {

    this.url = '?page=' + this.page;
    this.routes.params.subscribe((params: Params) => this.kw = params['kw']);
    console.log(this.kw);
    console.log(this.Ft.kw);

    if (this.kw !== null) {
      this.postServices.getFt(this.kw, this.url)
        .subscribe((data: any) => {

          if (data.data.length !== 0) {
            this.a = data.data.length;
            for (let i = 0; i < this.a; i++) {
              this.itemListData.push(data.data[i]);
            }

            if (isFirstLoad)
              event.target.complete();
            this.loading.dismiss();
            this.page++;

          } else {
            this.completed = true;
          }
        }, error => {
          console.log(error);
          this.loading.dismiss();
          this.AlertCtrl.create({
            header: 'ERROR',
            mode: 'ios',
            subHeader: 'FT ini sudah tidak aktif',
            message: 'Silahkan cari FT lain',
            buttons: ['Tutup'],
          }).then(res => {

            res.present();
            this.route.navigate(['/ft']);

          });
        })
    } else {
      this.AlertCtrl.create({
        header: 'Info',
        mode: 'ios',
        subHeader: 'ERROR',
        message: 'Silahkan isi kata kunci pencarian',
        buttons: ['Tutup'],
      }).then(res => {

        res.present();


      });
      this.loading.dismiss();
    }
  }

  doInfinite(event) {
    this.getDataPost(true, event);
  }

  // ionViewDidLoad() {
  //   this.kw.subscribe((value) => { 
  //     console.log(value);
  //     if (true === value) {
  //       this.getDataPost(true, event);
  //     } else {
  //       this.getDataPost(false, event);
  //     }
  //  });
  // }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
    this.loading.present();

    this.getDataPost(false, "");
    this.checkMobile = this.plt.is('desktop');
    console.log(this.checkMobile);

  }


  async openDetailModal(post: Fft) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { post },

    });
    modal.present();
  }




}
