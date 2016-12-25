"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require('./auth.service');
var instagramService_service_1 = require('./instagramService.service');
require('./rxjs-operators');
var HomeComponent = (function () {
    function HomeComponent(auth, instagramService) {
        this.auth = auth;
        this.instagramService = instagramService;
    }
    HomeComponent.prototype.getHandlesMentioningHashtag = function (hashtag) {
        var _this = this;
        var something = this.instagramService.getHandlesMentioningHashtag(hashtag);
        console.log('home.component.ts something.constructor.name = ' + something.constructor.name);
        // From https://angular.io/docs/ts/latest/guide/server-communication.html#!#subscribe
        something.subscribe(function (val) { return _this.items = something; }, function (error) { return _this.errorMessage = error; });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            providers: [instagramService_service_1.InstagramService],
            template: "\n    <h4 *ngIf=\"auth.authenticated()\">You are logged in</h4>\n    <h4 *ngIf=\"!auth.authenticated()\">You are not logged in, please click 'Log in' button to login</h4>\n\n    <input *ngIf=\"auth.authenticated()\" name=\"hashtag\" type=\"text\" [(ngModel)]=\"textValue\" required>\n    <button *ngIf=\"auth.authenticated()\" class=\"btn btn-primary btn-margin\" (click)=\"getHandlesMentioningHashtag(textValue)\">Get handles</button>\n    <button *ngIf=\"auth.authenticated()\" class=\"btn\" (click)=\"textValue=''\">Clear</button>\n    <pre *ngIf=\"auth.authenticated()\">contents of items: {{items}}</pre>\n    <pre *ngIf=\"auth.authenticated()\">errorMessage: {{errorMessage}}</pre>\n  "
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth, instagramService_service_1.InstagramService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
;
//# sourceMappingURL=home.component.js.map