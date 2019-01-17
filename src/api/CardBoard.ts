/* tslint:disable:variable-name */
import Board from './Board';
import { cardBoardApi } from '@/api/firebase';
class CardBoard extends Board {
  // protected static api = cardBoardApi;

  private _tags: string[] = [];
  constructor(uid: string, state: string) {
    super(uid, state);
  }

  get tags(): string[] | undefined {
    return this._tags;
  }
}

export default CardBoard;
