import api from '@/firebase/api.firebase';

/* tslint:disable:variable-name */
interface ObtainBoardData {
  // 생성할때 외부에서 받아야할 인자들
  _writerUid: string | null; // (회원은 uid, 비회원은 null)
  _password: string | null; // (회원은 null, 비회원은 설정한값)
  _initBoardName: string; // 게시판 이름 ( gaesory | card | ...)
  _boardNumber: number; // 게시판에서의 게시글번호
  _title: string; // 제목
  _htmlUid: string; // storage에 저장된 html의 uid
  _fileUids: string[]; // html에 있는 file들의 uid
}
interface DefaultBoardData {
  _createdAt: number;
  _updatedAt: number;
  _hits: number;
  _recommend: number;
  _decommend: number;
  _accusation: number;
  _commentUids: string[];
  _tags: string[];
}
interface BoardData extends ObtainBoardData, DefaultBoardData {
  _uid: string;
}

class Board {
  private _data: BoardData;
  constructor(obtainData: ObtainBoardData) {
    const defaultData: DefaultBoardData = {
      _createdAt: new Date().getTime(),
      _updatedAt: new Date().getTime(),
      _hits: 0,
      _recommend: 0,
      _decommend: 0,
      _accusation: 0,
      _commentUids: [],
      _tags: [],
    };

    // TODO uuid를 사용해서 uid 받기
    // this._uid = undefined;
    this._data = Object.assign(defaultData, obtainData, { _uid: '' });
  }
  get data(): BoardData {
    return this._data;
  }

  // ??? getter는 쓸모가 없을까?
  // get writerUid(): string | null {
  //   return this._data._writerUid;
  // }
  // get password(): string | null {
  //   return this._data._password;
  // }
  // get createdAt(): number {
  //   return this._data._createdAt;
  // }
  // get updatedAt(): number {
  //   return this._data._updatedAt;
  // }
  // get postNumber(): number {
  //   return this._data._boardNumber;
  // }
  // get title(): string {
  //   return this._data._title;
  // }
  // get hits(): number {
  //   return this._data._hits;
  // }
  // get recommend(): number {
  //   return this._data._recommend;
  // }
  // get decommend(): number {
  //   return this._data._decommend;
  // }
  // get accusation(): number {
  //   return this._data._accusation;
  // }
  // get commentsUids(): string[] {
  //   return this._data._commentUids;
  // }
  // get initBoardName(): string {
  //   return this._data._initBoardName;
  // }
  // get tags(): string[] | undefined {
  //   return this._data._tags;
  // }
  // get htmlUid(): string {
  //   return this._data._htmlUid;
  // }
  // get fileUids(): string[] {
  //   return this._data._fileUids;
  // }

  public save() {
    /** TODO
     * api 사용
     *  storage에 저장 - file, html
     *    html은 file이 저장되고 나온 downloadUrl을 html에 추가한 뒤 저장해야된다
     *  db에 저장 - Post 인스턴스
     *  User에 Post의 uid를 저장해줘야함
     */

    // TODO then catch로 error 처리하기
    api.firebaseDB.post.create(this);
    // .then()
    // .catch();
  }

  public get(postUid: string): object {
    return {};
  }

  public update(): void {
    //
  }

  public delete(): void {
    //
  }
}

export default Board;
