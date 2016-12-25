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

    <input *ngIf="auth.authenticated()" name="hashtag" type="text" [(ngModel)]="textValue" required>
    <button *ngIf="auth.authenticated()" class="btn btn-primary btn-margin" (click)="getHandlesMentioningHashtag(textValue)">Get handles</button>
    <button *ngIf="auth.authenticated()" class="btn" (click)="textValue=''">Clear</button>
    <pre *ngIf="auth.authenticated()">contents of items: {{items}}</pre>
  `
})

export class HomeComponent {
  items: Observable<string[]>;

  constructor(private auth: Auth, private instagramService: InstagramService) {}

  getHandlesMentioningHashtag (hashtag: string) {
    let something = this.instagramService.getHandlesMentioningHashtag(hashtag);
    console.log('home.component.ts something = ' + something);

    // From http://stackoverflow.com/a/36395263/2848676
    something.subscribe(val => console.log('something.subscribe val = ' + val));

    this.items = something;
  }
};
