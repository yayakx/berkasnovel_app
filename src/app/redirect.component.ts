import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redirect',
  template: 'Proses Download Segera dimulai...'
})
export class RedirectComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.open('https://berkasnovel.online/BerkasNovel%20Beta.apk', '_blank');
    window.location.href = "/";
  }
}