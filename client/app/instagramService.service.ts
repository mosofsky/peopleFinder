import {Injectable}                         from '@angular/core';
import {Jsonp, URLSearchParams, Response}   from '@angular/http';
import {Observable}                         from 'rxjs/Observable';

@Injectable()
export class InstagramService {

    constructor( private jsonp: Jsonp) {

    }

    public getHandlesMentioningHashtag(hashtag: string) {
        console.log('getHandlesMentioningHashtag LOG was called for hashtag = ' + hashtag);

        let access_token = localStorage.getItem('id_token');  // TODO Pass access_token into this method

        let instagramBaseURL = 'https://api.instagram.com/v1/tags/';
        let instagramURLWithTag = instagramBaseURL + hashtag + '/media/recent';

        console.log('instagramURLWithTag = ' + instagramURLWithTag);

        let instagramURL = instagramURLWithTag
            + '?'
            + 'access_token=' + access_token
            + 'callback=' + 'JSONP_CALLBACK';

        console.log('instagramURL = ' + instagramURL);

        return this.jsonp
            .get(instagramURLWithTag)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log('extractData called');

        let json = res.json();

        let returnMeta = json.meta;
        let returnCode = json.meta.code;
        console.log('returnCode = ' + returnCode);

        let returnerror_type = json.meta.error_type;
        console.log('returnerror_type = ' + returnerror_type);

        let returnerror_message = json.meta.error_message;
        console.log('returnerror_message = ' + returnerror_message);

        let returnData = json.data;
        console.log('returnData = ' + returnData);

        let paginationNextUrl = json.pagination.next_url;
        console.log('paginationNextUrl = ' + paginationNextUrl);

        return json.data || { };

    }

    private handleError(error: Response | any) {
        console.log('handleError called');

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log('handleError errMsg = ' + errMsg);
        return Observable.throw(errMsg);
    }
}
