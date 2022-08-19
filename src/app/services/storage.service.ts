import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.init();
    }

    public data:any;
    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create();
        this._storage = storage;
    }

    public set(key: string, value: any) {
        this._storage?.set(key, value);
    }

    public get(key) {
        const data = this.storage.get(key);
        return data;
    }


}