import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsService } from './services/post.service';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Daftar Update', url: '/post', icon: 'list' },
    { title: 'List Fan Translation', url: '/ft', icon: 'apps' },
    // { title: 'Favorites', url: '/favorite', icon: 'heart' },
    // { title: 'History', url: '/history', icon: 'time' },
    { title: 'Download Aplikasi', url: '/download', string:'apk', icon: 'download' },

  ];
  public labels = ['BerkasNovel App', 'Ver 5.0'];
  constructor(private postServices: PostsService, private routes: Router, private route: ActivatedRoute, public menuCtrl: MenuController, private plt: Platform, private platform: Platform) {
    this.routes.routeReuseStrategy.shouldReuseRoute = () => false;        
  }

  form: FormGroup;
  page = 1;
  kw: any;   

  ngOnInit(): void {
    this.form = new FormGroup({
      kw: new FormControl(null, [Validators.required])
    });    
  }

  CariNovel() {
    this.kw = this.form.value.kw;
    console.log(this.kw);    
    this.routes.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.routes.navigate(['/cari'])
    );
    this.menuCtrl.toggle();
  }
}
