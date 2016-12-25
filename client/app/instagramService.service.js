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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var InstagramService = (function () {
    function InstagramService(jsonp) {
        this.jsonp = jsonp;
    }
    InstagramService.prototype.getHandlesMentioningHashtag = function (hashtag) {
        console.log('getHandlesMentioningHashtag LOG was called for hashtag = ' + hashtag);
        var access_token = localStorage.getItem('id_token'); // TODO Pass access_token into this method
        var instagramBaseURL = 'https://api.instagram.com/v1/tags/';
        var instagramURLWithTag = instagramBaseURL + hashtag + '/media/recent';
        var instagramURL = instagramURLWithTag
            + '?' + 'access_token=' + access_token
            + '&' + 'callback=' + 'JSONP_CALLBACK';
        console.log('instagramURL = ' + instagramURL);
        return this.jsonp
            .get(instagramURL)
            .map(this.extractData)
            .catch(this.handleError);
    };
    InstagramService.prototype.extractData = function (res) {
        console.log('extractData called');
        var json = res.json();
        var returnMeta = json.meta;
        var returnCode = json.meta.code;
        console.log('extractData returnCode = ' + returnCode);
        if (400 == returnCode || '400' == returnCode) {
            console.log('extractData error_type = ' + json.meta.error_type || 'no error_type');
            console.log('extractData error_message = ' + json.meta.error_message || 'no error_message');
        }
        return 'extractData got returnCode ' + returnCode;
        // let returnData = json.data;
        // console.log('returnData = ' + returnData);
        //
        // let paginationNextUrl = json.pagination.next_url;
        // console.log('paginationNextUrl = ' + paginationNextUrl);
        //
        // return json.data || { };
    };
    InstagramService.prototype.handleError = function (error) {
        console.log('handleError called');
        var errMsg = "handleError got error of";
        if (error instanceof http_1.Response) {
            errMsg += ' error=' + error;
        }
        else {
            errMsg += ' message=' + error.message ? error.message : error.toString();
        }
        console.log('handleError errMsg = ' + errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    InstagramService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], InstagramService);
    return InstagramService;
}());
exports.InstagramService = InstagramService;
//# sourceMappingURL=instagramService.service.js.map