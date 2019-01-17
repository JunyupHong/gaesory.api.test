import { Board } from './index';
import Response from './Response';
import * as _ from 'lodash';
import apiTest from '@/views/api.test';
import uuid from 'uuid/v4';

export interface BoardApiConfigure {
  baseCollectionRoot: string;
  baseStorageRoot: string;
}

export default class BoardApi<T extends Board> {
  // TODO
  // 페이지화 해서 가져오는 api => 몇번부터 받을지 or 몇페이지 인지 받고, 갯수를 인자로 받아서 리턴해준다
  private db;
  private baseCollectionName;

  private storage;
  private baseStorageRoot;

  public constructor(db, storage, conf: BoardApiConfigure) {
    this.db = db;
    this.baseCollectionName = conf.baseCollectionRoot;

    this.storage = storage;
    this.baseStorageRoot = conf.baseStorageRoot;
  }
  public createFile(
    board: Board,
    file: File | Blob,
  ): Promise<Response<string>> {
    return new Promise((resolve, reject) => {
      const uid: string = uuid();
      const ref = this.storage
        .ref(`${this.baseStorageRoot}/${board.uid}/files`)
        .child(uid);
      ref
        .put(file)
        .then(async () => {
          try {
            const downloadUrl: string = await ref.getDownloadURL();
            board.fileUids.push({ uid, downloadUrl });
            console.log('upload');
            resolve(new Response<string>(true).setData(downloadUrl));
          } catch (e) {
            console.error(e);
            reject(new Response(false).setError(e));
          }
        })
        .catch((e) => {
          console.error(e);
          reject(new Response(false).setError(e));
        });
    });
  }
  public createHTML(board: Board, html: string): Promise<Response<void>> {
    return new Promise((resolve, reject) => {
      const uid: string = uuid();
      const ref = this.storage
        .ref(`${this.baseStorageRoot}/${board.uid}/html`)
        .child(uid);
      ref
        .putString(html)
        .then(() => {
          resolve(new Response(true));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public readFile() {
    //
  }
  public readHTML() {
    //
  }
  public deleteFile() {
    //
  }
  public deleteHTML() {
    //
  }
  public exist(id: string, state: string): Promise<Response<boolean>> {
    return new Promise((resolve, reject) => {
      let root;
      try {
        root = this.checkState(state);
      } catch (e) {
        reject(new Response(false).setError(e));
      }
      this.db
        .collection(root)
        .doc(id)
        .get()
        .then((doc) => {
          console.log('boards at: ' + root);
          resolve(new Response<boolean>(true).setData(doc.exists));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public create(board: Board, state: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let root;
      try {
        root = this.checkState(state);
      } catch (e) {
        reject(new Response(false).setError(e));
      }
      const data = {};
      _.forEach(Object.keys(board), (k) => {
        data[k] = board[k];
      });
      this.db
        .collection(root)
        .doc(board.uid)
        .set(data)
        .then((docRef) => {
          console.log(
            'success board api create with ID: ' + board.uid,
            'at: ' + root,
          );
          resolve(); // 여기도 Response로 리턴해줘야하나?
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public read(id, state: string): Promise<Response<object>> {
    return new Promise((resolve, reject) => {
      let root;
      try {
        root = this.checkState(state);
      } catch (e) {
        reject(new Response(false).setError(e));
      }
      this.db
        .collection(root)
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('success board api read with ID: ' + id, 'at: ' + root);
            resolve(new Response(true).setData(doc.data()));
          } else {
            reject(
              new Response(false).setError(
                new Error('board is not exist with id: ' + id),
              ),
            );
          }
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  public update(board: Board, state: string): Promise<Response<void>> {
    return new Promise((resolve, reject) => {
      let root;
      try {
        root = this.checkState(state);
      } catch (e) {
        reject(new Response(false).setError(e));
      }
      this.db
        .collection(root)
        .doc(board.uid)
        .update({
          _title: board.title,
          _updatedAt: board.updatedAt,
          _commentUids: board.commentsUids,
          _fileUids: board.fileUids,
        })
        .then(() => {
          console.log('Document successfully updated!');
          resolve(new Response(true));
        })
        .catch((e) => {
          if (e.code === 'not-found') {
            this.create(board, state)
              .then(() => {
                resolve(new Response(true));
              })
              .catch((err) => {
                reject(new Response(false).setError(err));
              });
          } else {
            reject(new Response(false).setError(e));
          }
        });
    });
  }
  public delete(id: string, state: string): Promise<Response<void>> {
    return new Promise((resolve, reject) => {
      let root;
      try {
        root = this.checkState(state);
      } catch (e) {
        reject(new Response(false).setError(e));
      }
      this.db
        .collection(root)
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted! at: ' + root);
          resolve(new Response(true));
        })
        .catch((e) => {
          reject(new Response(false).setError(e));
        });
    });
  }
  private checkState(state: string): string {
    let root: string;
    if (state === 'Creating' || state === 'Editing' || state === 'Published') {
      root = state + this.baseCollectionName;
      return root;
    } else {
      throw new Error('state error');
    }
  }
}
