/* tslint:disable:variable-name */
import Board from './Board';

class CardBoard extends Board {
  private _tags: string[] = [];
  constructor(uid: string) {
    super(uid);
  }

  get tags(): string[] | undefined {
    return this._tags;
  }
}
