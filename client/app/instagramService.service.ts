import { Injectable }      from '@angular/core';
import { Logger }          from "angular2-logger/core";

@Injectable()
export class InstagramService {

  constructor( private _logger: Logger ) {

  }

  public getHandlesMentioningHashtag() {
      var access_token = localStorage.getItem('id_token');  // TODO Pass access_token into this method
      this._logger.warn('getHandlesMentioningHashtag was called and access_token = ' + access_token);
  };
}
