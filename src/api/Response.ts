/* tslint:disable:variable-name */

export default class Response<T> {
  private _success: boolean;
  private _error: Error | null = null;
  private _data: T;
  constructor(isSuccess: boolean) {
    this._success = isSuccess;
    // @ts-ignore
    this._data = undefined;
    this._error = null;
  }
  public setError(e: Error) {
    this._error = e;
    return this;
  }
  public setData(data) {
    this._data = data;
    return this;
  }
  get data() {
    return this._data;
  }
}
