import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { PostsService } from '../services/post.service';
import { Cari } from '../cari/cari.model';
import { DetailComponent } from '../detail/detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-post',
  templateUrl: './cari.page.html',
  styleUrls: ['./cari.page.scss'],
})
export class CariPage implements OnInit {
  posts$: Observable<Cari[]>;
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
  checkData;
  checkMobile;
  completed = false;


  constructor(
    private postServices: PostsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private App: AppComponent,
    private AlertCtrl: AlertController,
    public menuCtrl: MenuController,
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

  getDataPost(isFirstLoad, event) {

    this.url = '?page=' + this.page;
    this.kw = this.App.kw;
    console.log(this.kw);

    if (this.kw !== null) {
      this.postServices.getNovel(this.kw, this.url)
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
            this.checkData = true;

          } else {
            this.completed = true;            
            if (this.checkData !== true && this.itemListData.length < 1) {
              this.route.navigate(['/post']);
              this.AlertCtrl.create({
                header: 'Info',
                mode: 'ios',
                subHeader: 'Novel ' + this.kw + ' tidak ditemukan',
                message: 'Silahkan cari dengan kata kunci lain',
                buttons: ['Tutup'],
              }).then(res => {
                res.present();
              });
              this.loading.dismiss();
            }
          }
        }, error => {
          console.log(error);
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
      this.route.navigate(['/post']);

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


  async openDetailModal(post: Cari) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { post },

    });
    modal.present();
  }




}
