/* tslint:disable:variable-name */
/**
 * @param  {string} myMessage 'post create error'
 *
 * @param  {Error} e
 */

class GaesoryError extends Error {
  constructor(private _myMessage: string, private e: Error) {
    super();
  }
  get myMessage() {
    return this._myMessage;
  }
}

export default GaesoryError;
