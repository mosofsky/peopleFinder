import { Component }  from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Auth }       from './auth.service';
import { InstagramService }  from './instagramService.service';

import './rxjs-operators';

@Component({
  selector: 'home',
  providers: [ InstagramService ],
  template: `
    <h4 *ngIf="auth.authenticated()">You are logged in</h4>
    <h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>

    <input *ngIf="auth.authenticated()" #hashtag type="text" [(ngModel)]="textValue" required>
    <button *ngIf="auth.authenticated()" class="btn btn-primary btn-margin" (click)="getHandlesMentioningHashtag(hashtag.value)">Get handles</button>
    <button *ngIf="auth.authenticated()" class="btn" (click)="textValue=''">Clear</button>
    <pre *ngIf="auth.authenticated()">{{items}}</pre>
  `
})

export class HomeComponent {
  items: Observable<string[]>;

  constructor(private auth: Auth, private instagramService: InstagramService) {}

  getHandlesMentioningHashtag (hashtag: string) {
    this.items = this.instagramService.getHandlesMentioningHashtag(hashtag);
  }
};
