import apiTest from '@/views/api.test';

/* tslint:disable:variable-name */
class Board {
  get uid(): string {
    return this._uid;
  }
  get writerUid(): string | null {
    return this._writerUid;
  }
  get password(): string | null {
    return this._password;
  }
  get createdAt(): number {
    return this._createdAt;
  }
  get updatedAt(): number {
    return this._updatedAt;
  }
  get postNumber(): number {
    return this._boardNumber;
  }
  get title(): string {
    return this._title;
  }
  get hits(): number {
    return this._hits;
  }
  get recommend(): number {
    return this._recommend;
  }
  get decommend(): number {
    return this._decommend;
  }
  get accusation(): number {
    return this._accusation;
  }
  get commentsUids(): string[] {
    return this._commentUids;
  }
  get initBoardName(): string {
    return this._category;
  }

  get htmlUid(): string {
    return this._htmlUid;
  }
  get fileUids(): string[] {
    return this._fileUids;
  }
  public static load() {
    //
  }
  private _uid: string;
  private _writerUid: string = '';
  private _password: string = '';
  private _createdAt: number = 0;
  private _updatedAt: number = 0;
  private _boardNumber: number = 0;
  private _title: string = '';
  private _hits: number = 0;
  private _recommend: number = 0;
  private _decommend: number = 0;
  private _accusation: number = 0;
  private _commentUids: string[] = [];
  private _category: string = ''; // 게시판 이름

  private _htmlUid: string = '';
  private _fileUids: string[] = [];

  constructor(uid: string) {
    this._uid = uid;
  }

  public save() {
    //
  }
}

export default Board;
