import firebase from './initialize.firebase';
import { Board, User, Error as MyError } from '@/class';
import * as _ from 'lodash';
import FormUtil from '@/util/form-util';
import { ObtainBoardData } from '@/class/Board';

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const firebaseAuth = {};

const firebaseDB = {
  user: {
    create: (data: User) => {
      //
    },

    read: (uid: string): object => {
      return {};
    },

    update: (data: User) => {
      //
    },

    delete: (uid: string) => {
      //
    },
  },
  post: {
    create(board: Board) {
      return new Promise((resolve, reject) => {
        db.collection('posts')
          .doc(board.data._uid)
          .set(board.data)
          .then((docRef) => {
            alert('success create board with ID: ' + board.data._uid);
            resolve();
          })
          .catch((e) => {
            reject(new MyError('error create board', e));
          });
      });
    },
    read: (id?: string) => {
      // ??? if else를 쓰는게 맞는가??
      if (id) {
        return new Promise((resolve, reject) => {
          db.collection('posts')
            .doc(id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                alert('success read board with ID: ' + id);
                // TODO Util form을 만들어야함 => ObtainBoardData를 만드는 함수를 구현
                // => 인터페이스를 인자로 바로 넘길 수 없다
                // ??? util대신 api에서 선택 프로퍼티를 default로 채워주는 메소드를 만드는건?

                try {
                  resolve(doc.data());
                } catch (error) {
                  reject(
                    new MyError('error read board by doc data form', error),
                  );
                }
              } else {
                reject(
                  new MyError(
                    'error read board: document is not exist',
                    new Error('error read board by document is not exist'),
                  ),
                );
              }
            })
            .catch((e) => {
              reject(new MyError('error read board', e));
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          db.collection('posts')
            .get()
            .then((querySnapshot) => {
              const boards: Board[] = [];
              querySnapshot.forEach((doc) => {
                // TODO doc.data() arrary를 넘기고 new Board는 Board클래스에서 한다
                boards.push(
                  new Board(FormUtil.makeDocToObtainBoardData(doc.data())),
                );
              });
              alert('success read all boards');
              resolve(boards);
            })
            .catch((e) => {
              reject(new MyError('error read all board', e));
            });
        });
      }
    },

    // update랑 create랑 똑같은데...?
    update: (board: Board) => {
      //
    },
    delete: () => {
      //
    },
  },
};

const storage = firebase.storage();
const storageRef = storage.ref();
const filesRef = storageRef.child('files');
const filePath = filesRef.fullPath;

const firebaseStorage = {
  file: {
    create: (file: { name: '' }) => {
      // file을 배열로 받아서 다 저장하고 그 다운로드 url을 리턴해야함
      // file 저장할때 uuid를 사용해서 uid로 저장하고 그 uid를 post에 넘겨줘야함
      const fileRef = storageRef.child(`files/${file.name}`);
      fileRef.put(file).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
      });
    },
    delete: (id: string) => {
      //
    },
    read: (id: string): object => {
      return {};
    },
  },
  html: {
    create: (uid: string) => {
      //
    },
    delete: async (uid: string) => {
      //
    },
    update: async (uid: string, html: string) => {
      //
    },
    read: async (uid: string): Promise<string> => {
      return '';
    },
  },
};

const firebaseAPI = {
  firebaseDB,
  firebaseStorage,
  firebaseAuth,
};

export default firebaseAPI;
