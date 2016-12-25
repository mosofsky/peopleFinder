import {Injectable}                         from '@angular/core';
import {Logger}                             from "angular2-logger/core";
import { Http, Jsonp, URLSearchParams, Response}   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

@Injectable()
export class InstagramService {

    constructor(private _logger: Logger, private jsonp: Jsonp, private http: Http) {

    }

    public getHandlesMentioningHashtag(hashtag: string) {
        this._logger.warn('getHandlesMentioningHashtag was called for hashtag = ' + hashtag);

        let access_token = localStorage.getItem('id_token');  // TODO Pass access_token into this method

        let instagramBaseURL = 'https://api.instagram.com/v1/tags/';
        let instagramURLWithTag = instagramBaseURL + hashtag;

        let params = new URLSearchParams();
        params.set('access_token', access_token);
        params.set('callback', 'JSONP_CALLBACK');

        return this.jsonp
            .get(instagramURLWithTag, {search: params})
            .map(response => <string[]> response.json()[1])
            .catch(this.handleError); // TODO Error handling for network failures
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this._logger.error(errMsg);
        return Observable.throw(errMsg);
    }
}
