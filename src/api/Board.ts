import { Response } from '@/api';
// import { database } from 'firebase';
import * as _ from 'lodash';
import { boardApi } from './firebase';
import { cardBoardApi } from './firebase';

/* tslint:disable:variable-name */
export default class Board {
  public static existAtCreatingByWriterUid(writerUid: string) {
    return new Promise(async (resolve, reject) => {
      boardApi
        .exist(writerUid, 'Creating')
        .then((ret) => {
          resolve(new Response(true).setData(ret.data));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public static existAtEditingByWriterUid(writerUid: string) {
    return new Promise(async (resolve, reject) => {
      boardApi
        .exist(writerUid, 'Editing')
        .then((ret) => {
          resolve(new Response(true).setData(ret.data));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public static loadAtCreating(id: string): Promise<Response<Board>> {
    return new Promise((resolve, reject) => {
      boardApi
        .read(id, 'Creating')
        .then((ret) => {
          const board = Object.assign(new Board(id, 'Creating'), ret.data);
          resolve(new Response<Board>(true).setData(board));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public static loadAtEditing(id: string): Promise<Response<Board>> {
    return new Promise((resolve, reject) => {
      boardApi
        .read(id, 'Editing')
        .then((ret) => {
          const board = Object.assign(new Board(id, 'Editing'), ret.data);
          resolve(new Response<Board>(true).setData(board));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public static loadAtPublished(id: string): Promise<Response<Board>> {
    return new Promise((resolve, reject) => {
      boardApi
        .read(id, 'Published')
        .then((ret) => {
          const board = Object.assign(new Board(id, 'Published'), ret.data);
          resolve(new Response<Board>(true).setData(board));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  // protected static api = boardApi;

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
  private _fileUids: Array<{ uid: string; downloadUrl: string }> = [];
  private _state: string = '';

  constructor(uid: string, state: string) {
    this._uid = uid;
    this._state = state;
  }

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
  get fileUids(): Array<{ uid: string; downloadUrl: string }> {
    return this._fileUids;
  }
  public save() {
    return new Promise((resolve, reject) => {
      this._updatedAt = new Date().getTime();
      boardApi
        .update(this, this._state)
        .then(() => {
          resolve(new Response(true));
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  public publish(): Promise<Response<void>> {
    return new Promise(async (resolve, reject) => {
      this._updatedAt = new Date().getTime();
      try {
        const temp = this._state;
        this._state = 'Published';
        await boardApi.create(this, 'Published');
        this._state = temp;
        await boardApi.delete(this._uid, this._state);
        resolve(new Response(true));
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
  public async loadContent() {
    // storage에 있는 file, html 데이터를 가져와서 set한다
    // DB에서 댓글 가져오기
  }
  public delete(): Promise<Response<boolean>> {
    return new Promise(async (resolve, reject) => {
      const isExist = await boardApi.exist(this._uid, this._state);
      if (isExist) {
        boardApi
          .delete(this._uid, this._state)
          .then(() => {
            resolve(new Response<boolean>(true).setData(true));
          })
          .catch((e) => {
            reject(new Response(false).setError(e));
          });
      } else {
        reject(
          new Response(false).setError(
            new Error('board is not exist with id: ' + this._uid),
          ),
        );
      }
    });
  }
}
