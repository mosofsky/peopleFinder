import { Injectable }      from '@angular/core';
import { Logger }          from "angular2-logger/core";

@Injectable()
export class InstagramService {

  constructor( private _logger: Logger ) {

  }

  public getHandlesMentioningHashtag() {
      //localStorage.setItem('id_token', authResult.idToken);
      var access_token = localStorage.getItem('id_token');
      this._logger.warn('getHandlesMentioningHashtag was called and access_token = ' + access_token);
  };
}
