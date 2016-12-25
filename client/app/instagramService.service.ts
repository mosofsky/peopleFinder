import { Injectable }      from '@angular/core';
import { Logger }          from "angular2-logger/core";

@Injectable()
export class InstagramService {

  constructor( private _logger: Logger ) {

  }

  public getHandlesMentioningHashtag() {
      this._logger.warn('getHandlesMentioningHashtag was called');
  };
}
