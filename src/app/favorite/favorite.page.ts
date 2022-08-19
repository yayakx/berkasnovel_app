import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { PostsService } from '../services/post.service';
import { DetailComponent } from '../detail/detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Favorite } from './favorite.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PostPage } from '../post/post.page';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-post',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  posts$: Observable<Favorite[]>;
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
  myFav = [];
  arrTemp = [];
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
    public storage: NativeStorage,
    public postPage: PostPage,
    public plt: Platform,

  ) { }

  addHistory(post) {
    console.log(post);
    this.postServices.addHistory(post);
  }

  showImage(src) {
    return this.sanitizer.bypassSecurityTrustUrl(src)
  }

  async addFavorite(post) {
    this.myFav.push(post);
    this.storage.setItem('listFav', JSON.stringify(this.myFav.reverse()));
    this.storage.getItem('listFav').then((val) => {
      console.log(JSON.parse(val));
    });
  }

  async removeFavorite(post) {
    let index: number = this.myFav.indexOf(post);
    if (index > -1) {
      this.myFav.splice(index, 1);
    }
    console.log(this.myFav);
    this.storage.setItem('listFav', JSON.stringify(this.myFav));
    this.storage.getItem('listFav').then((val) => {
      console.log(JSON.parse(val));
    });
    this.route.navigateByUrl('/post', { skipLocationChange: true }).then(() =>
      this.route.navigate(['/favorite'])
    );
    window.location.reload();
  }

  getDataPost(isFirstLoad, event) {

    this.url = '?page=' + this.page;

    this.kw = this.storage.getItem('listFav').then((val) => {
      var list = val.toString();
      console.log(list);
      this.postServices.getFav(list, this.url)
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
            if (this.itemListData.length < 1) {
              this.AlertCtrl.create({
                header: 'Info',
                mode: 'ios',
                subHeader: 'Anda belum menambahkan daftar favorite',
                message: 'Silahkan tambahkan terlebih dahulu',
                buttons: ['Tutup'],
              }).then(res => {
                res.present();
              });
              this.loading.dismiss();
              this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.route.navigate(['/favorite'])
              );
              this.loading.dismiss();

            }
          }
        }, error => {
          this.loading.dismiss();
          this.route.navigate(['/post']);
          console.log(error);
        })
      this.loading.dismiss();
    });
  }

  doInfinite(event) {
    this.getDataPost(true, event);
  }

  ionViewDidLoad() {
    this.kw.subscribe((value) => {
      console.log(value);
      if (true === value) {
        this.getDataPost(true, event);
      } else {
        this.getDataPost(false, event);
      }
    });
  }

  setArr(arrTemp) {
    for (let i = 0; i < arrTemp.length; i++) {
      this.myFav.push(arrTemp[i]);
    }
  }

  async ngOnInit() {
    console.log(this.plt.is('android'));
    if (this.plt.is('android') == false || this.plt.is('mobileweb') == true) {
      this.AlertCtrl.create({
        header: 'Info',
        mode: 'ios',
        subHeader: 'Fitur Hanya Tersedia di Aplikasi Mobile',
        message: 'Silahkan Tunggu Sampai Update Berikutnya',
        buttons: ['Tutup'],
      }).then(res => {
        res.present();
        this.route.navigateByUrl('/favorite', { skipLocationChange: true }).then(() =>
          this.route.navigate(['/post'])
        );
      });
    }
    else {
      this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
      this.loading.present();

      this.getDataPost(false, "");
      this.storage.getItem('listFav').then((val) => {
        this.arrTemp = JSON.parse(val);
        this.setArr(this.arrTemp);
        console.log(this.myFav);
        this.loading.dismiss();
      });
    }
  }


  async openDetailModal(post: Favorite) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { post },

    });
    modal.present();
  }




}
