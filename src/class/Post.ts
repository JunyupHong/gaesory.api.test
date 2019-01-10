import api from '@/firebase/api.firebase';
/* tslint:disable:variable-name */
interface PostObj {
  // 생성할때 외부에서 받아야할 인자들
  _writerUid: string | null; // (회원은 uid, 비회원은 null)
  _password: string | null; // (회원은 null, 비회원은 설정한값)
  _initBoardName: string; // 게시판 이름 ( gaesory | card | ...)
  _postNumber: number; // 게시판에서의 게시글번호
  _title: string; // 제목
  _htmlUid: string; // storage에 저장된 html의 uid
  _fileUids: string[]; // html에 있는 file들의 uid
}

class Post {
  private _createdAt: number;
  private _updatedAt: number;
  private _hits: number; // 조회수
  private _recommend: number; // 추천수
  private _decommend: number; // 비추천수
  private _accusation: number; // 신고수
  private _commentUids: string[]; // 댓글의 id [id, id]
  private _tags?: string[]; // 카드 게시물의 태그

  constructor(private postObj: PostObj) {
    // TODO uuid를 사용해서 uid 받기
    // this._uid = undefined;
    this._createdAt = new Date().getTime();
    this._updatedAt = this._createdAt;
    this._hits = 0;
    this._recommend = 0;
    this._decommend = 0;
    this._accusation = 0;
    this._commentUids = [];
    this._tags = [];
    // TODO assign으로 postObj 평탄화하기!
    // _.assign(this, postObj);
  }

  get writerUid(): string | null {
    return this.postObj._writerUid;
  }
  get password(): string | null {
    return this.postObj._password;
  }
  get createdAt(): number {
    return this._createdAt;
  }
  get updatedAt(): number {
    return this._updatedAt;
  }
  get postNumber(): number {
    return this.postObj._postNumber;
  }
  get title(): string {
    return this.postObj._title;
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
    return this.postObj._initBoardName;
  }
  get tags(): string[] | undefined {
    return this._tags;
  }
  get htmlUid(): string {
    return this.postObj._htmlUid;
  }
  get fileUids(): string[] {
    return this.postObj._fileUids;
  }

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

export default Post;
