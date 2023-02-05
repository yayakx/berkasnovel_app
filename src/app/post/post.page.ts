import { Component, OnInit, SecurityContext, ViewChild, Injector } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PostsService } from '../services/post.service';
import { Post } from '../post/post.model';
import { DetailComponent } from '../detail/detail.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  posts$: Observable<Post[]>;
  trial = new Date("12/12/2023");
  todayDate = new Date();
  url: string;
  itemListData = [];
  page = 1;
  loading;
  idOld$: any;
  idOld: any;
  idOldd: any;
  idNow: any;
  public imgSrc: any;
  myFav = [];
  arrTemp;
  checkMobile;
  appver = 5;
  checkver = 0;
  apiUrl = 'https://berkasnovel.online/api/';

  constructor(
    private postServices: PostsService,
    private storageServices: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private storage: NativeStorage,
    private AlertCtrl: AlertController,
    public sanitizer: DomSanitizer,
    public bgMode: BackgroundMode,
    public plt: Platform,
    private Storage: Storage,  
    private http: HttpClient,  

  ) { }

  addHistory(post) {
    console.log(post);
    this.postServices.addHistory(post);
  }

  goToLink(post) {
    console.log(post);    
    this.http.get(this.apiUrl + 'dibaca/' + post.id_rss).subscribe((res: any) => {
      console.log(res);
      window.open(post.permalink, "_blank");
      },
    error=>{
      console.log(error);
    } );
    
  }

  showImage(src) {
    return this.sanitizer.bypassSecurityTrustUrl(src)
  }

  handleImageError(image) {
    image.hide = true;
  }

  ionViewWillEnter() {
    this.Storage.set('checkver', true);
    this.postServices.getVer().subscribe((data: any) => {
      if (this.appver < data) {
        console.log(data);
        this.AlertCtrl.create({
          header: 'Info',
          mode: 'ios',
          subHeader: 'Versi Baru Telah Tersedia',
          message: 'Silahkan Unduh di Situs BerkasNovel',
          buttons: [
						// {
						//   text: 'Update',
						//   handler: () => {                 
            //     window.open('https://berkasnovel.online/dl_berkasnovel.html', '_blank', 'location=no');                
						//   }
						// },
						{
						  text: 'Tutup',						  
						}
					],
        }).then(res => {
          res.present();
          this.Storage.set('checkver', false);
        });
      }
    });

  };

  async addFavorite(post) {
    this.myFav.push(post);
    // this.storage.setItem(this.myFav[arr + 1], post);    
    // console.log(this.myFav);
    this.storage.setItem('listFav', JSON.stringify(this.myFav));
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
  }


  getDataPost(isFirstLoad, event) {
    const self = this;
    this.url = '?page=' + this.page;

    this.postServices.getPosts(this.url)
      .subscribe((data: any) => {
        // console.log(data.data[0].id_rss);
        for (let i = 0; i < data.data.length; i++) {
          this.itemListData.push(data.data[i]);
        }

        if (isFirstLoad)
          event.target.complete();
        this.loading.dismiss();
        this.page++;

        if (this.idOld < this.itemListData[0].id_rss) {
          console.log('Wayahe Update');
          this.storageServices.set('last', this.itemListData[0].id_rss);
        }
      }, error => {
        console.log(error);
      })
  }

  doInfinite(event) {
    this.getDataPost(true, event);
  }

  setArr(arrTemp) {
    for (let i = 0; i < arrTemp.length; i++) {
      this.myFav.push(arrTemp[i]);
    }
  }

  async ngOnInit() {
    console.log(this.checkver);
    if (this.trial >= this.todayDate) {
      this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
      this.loading.present();
      this.getDataPost(false, "");

      this.idOld = await this.storageServices.get('last');
      this.bgMode.enable();
      this.checkMobile = this.plt.is('desktop');
      this.plt.platforms();
      console.log(this.checkMobile);
      console.log(this.plt.platforms());

      this.storage.getItem('listFav').then((val) => {
        this.arrTemp = JSON.parse(val);
        this.setArr(this.arrTemp);
        console.log(this.myFav);
      });
    }
    else {
      const loading = await this.loadingCtrl.create({ message: 'Masa Beta Test Sudah Lewat, Silahkan kunjungi Fanspage BerkasNovel untuk Informasi Lebih Lanjut...' });
      loading.present()
    }
  }

  async openDetailModal(post: Post) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { post },

    });
    this.postServices.setDibaca(post.id_rss);
    modal.present();
  }




}
