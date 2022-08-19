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
import { History } from './history.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PostPage } from '../post/post.page';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-post',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  posts$: Observable<History[]>;
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
  myHistory = [];
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

  showImage(src) {
    return this.sanitizer.bypassSecurityTrustUrl(src)
  }  

  getDataPost(isFirstLoad, event) {

    this.url = '?page=' + this.page;

    this.kw = this.storage.getItem('listHistory').then((val) => {
      var list = val.toString();
      console.log(list);
      this.postServices.getHistory(list, this.url)
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
          this.completed = true;
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
      this.myHistory.push(arrTemp[i]);
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
        this.route.navigateByUrl('/history', { skipLocationChange: true }).then(() =>
          this.route.navigate(['/post'])
        );
      });
    }
    else {
      this.loading = await this.loadingCtrl.create({ message: 'Loading...' });      
      this.getDataPost(false, "");
      this.storage.getItem('listHistory').then((val) => {
        this.loading.present();
        this.arrTemp = JSON.parse(val);
        this.setArr(this.arrTemp);        
        this.loading.dismiss();
      });      
    }
  }


  async openDetailModal(post: History) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { post },

    });
    modal.present();
  }




}
