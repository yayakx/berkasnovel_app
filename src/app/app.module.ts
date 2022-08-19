import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http'
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FftPage } from './fft/fft.page';
import { FtPage } from './ft/ft.page';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { PostPage } from './post/post.page';
import { Storage } from '@ionic/storage';






import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent, DetailComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, NativeStorage, FftPage, FtPage, BackgroundMode, PostPage, Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
