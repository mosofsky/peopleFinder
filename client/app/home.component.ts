import { Component }  from '@angular/core';
import { Auth }       from './auth.service';
import { InstagramService }  from './instagramService.service';

@Component({
  selector: 'home',
  providers: [ InstagramService ],
  template: `
    <h4 *ngIf="auth.authenticated()">You are logged in</h4>
    <h4 *ngIf="!auth.authenticated()">You are not logged in, please click 'Log in' button to login</h4>
    <button *ngIf="auth.authenticated()" class="btn btn-primary btn-margin" (click)="instagramService.getHandlesMentioningHashtag()">Get handles</button>
  `
})

export class HomeComponent {
  constructor(private auth: Auth, private instagramService: InstagramService) {}
};
