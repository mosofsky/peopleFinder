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
        let instagramURL = instagramURLWithTag
            + '?'
            + 'access_token=' + access_token + '&'
            + 'callback=' + 'JSONP_CALLBACK';

        console.log('instagramURL = ' + instagramURL);

        return this.jsonp
            .get(instagramURL)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log('extractData called');

        let json = res.json();

        let returnMeta = json.meta;
        let returnCode = json.meta.code;
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

    }

    private handleError(error: Response | any) {
        console.log('handleError called');

        let errMsg = "handleError got error of";
        if (error instanceof Response) {
            errMsg += ' error=' + error;
        }
        else {
            errMsg += ' message=' + error.message ? error.message : error.toString();
        }

        console.log('handleError errMsg = ' + errMsg);
        return Observable.throw(errMsg);
    }
}
