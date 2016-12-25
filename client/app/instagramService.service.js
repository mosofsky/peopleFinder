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
var core_2 = require("angular2-logger/core");
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var InstagramService = (function () {
    function InstagramService(_logger, jsonp, http) {
        this._logger = _logger;
        this.jsonp = jsonp;
        this.http = http;
    }
    InstagramService.prototype.getHandlesMentioningHashtag = function (hashtag) {
        this._logger.warn('getHandlesMentioningHashtag was called for hashtag = ' + hashtag);
        var access_token = localStorage.getItem('id_token'); // TODO Pass access_token into this method
        var instagramBaseURL = 'https://api.instagram.com/v1/tags/';
        var instagramURLWithTag = instagramBaseURL + hashtag;
        var params = new http_1.URLSearchParams();
        params.set('access_token', access_token);
        params.set('callback', 'JSONP_CALLBACK');
        return this.jsonp
            .get(instagramURLWithTag, { search: params })
            .map(function (response) { return response.json()[1]; })
            .catch(this.handleError); // TODO Error handling for network failures
    };
    InstagramService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    InstagramService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this._logger.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    InstagramService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.Logger, http_1.Jsonp, http_1.Http])
    ], InstagramService);
    return InstagramService;
}());
exports.InstagramService = InstagramService;
//# sourceMappingURL=instagramService.service.js.map