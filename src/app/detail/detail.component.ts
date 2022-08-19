import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Post } from '../post/post.model';
import {DomSanitizer} from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { PostsService } from '../services/post.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  iframeURL:any;
  @Input() post: Post;
  loading;
  checkMobile:any;
  
  constructor(
    private modalCtrl: ModalController,
    private domSanit: DomSanitizer, 
    private postServices: PostsService, 
    private loadingCtrl: LoadingController, 
    private plt:Platform,  
  ) { }

  
  
  ngOnInit() {
    this.checkMobile = this.plt.is('desktop');
    console.log(this.checkMobile);
  }

  async ionViewWillEnter(){
    this.iframeURL = this.getSafeUrl() ;
    // this.loading = await this.loadingCtrl.create({ message: 'Loading...' });
    // this.loading.present();
    // window.open (this.postServices.apiUrl + 'isi/' + this.post.id_rss);
    // this.loading.dismiss();
  }

  getSafeUrl(){
    return this.domSanit.bypassSecurityTrustResourceUrl(this.post.permalink);
    // return this.domSanit.bypassSecurityTrustResourceUrl(this.postServices.apiUrl + 'isi/' + this.post.id_rss);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
