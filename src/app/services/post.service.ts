import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from 'src/environments/environment';
import { Ft } from '../ft/ft.model';
import { Post } from '../post/post.model';


@Injectable({
    providedIn: 'root'
})
export class PostsService {
    apiUrl = 'https://berkasnovel.online/api/'
    a: any;
    myHistory = [];

    constructor(
        private http: HttpClient,
        public storage: NativeStorage,
    ) { }



    getPosts(page): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl + 'post' + page);
    }

    getFav(kw, page): Observable<Post[]> {
        console.log(this.apiUrl + 'fav/' + kw + page);
        return this.http.get<Post[]>(this.apiUrl + 'fav/' + kw + page);
    }

    getHistory(kw, page): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl + 'fav/' + kw + page);
    }

    getNovel(kw, page): Observable<Post[]> {
        console.log(this.apiUrl + 'cari/' + kw + page);
        return this.http.get<Post[]>(this.apiUrl + 'cari/' + kw + page);
    }

    getFt(kw, page): Observable<Post[]> {
        console.log(this.apiUrl + 'ft/' + kw + page);
        return this.http.get<Post[]>(this.apiUrl + 'ft/' + kw + page);
    }

    getFts(): Observable<Ft[]> {
        return this.http.get<Ft[]>(this.apiUrl + 'listft')
    }

    getVer(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl + 'ver');
    }

    setDibaca(kw) {
        console.log(this.apiUrl + 'dibaca/' + kw);
        this.http.get(this.apiUrl + 'dibaca/' + kw);
    }

    addHistory(post) {
        // this.myHistory = JSON.parse(this.storage.getItem('listHistory'));  
        this.storage.getItem('listHistory').then((val) => {
            this.myHistory = JSON.parse(val);
            this.myHistory.push(post);
            this.storage.setItem('listHistory', JSON.stringify(this.myHistory.reverse()));
        });
    }
}