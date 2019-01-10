import firebase from './initialize.firebase';
import { Board, User } from '@/class';

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
      db.collection(`posts`)
        .doc(board.data._uid)
        .set(board.data)
        .then((docRef) => {
          if (board.data._writerUid) {
            alert('Member save Board with ID: ' + board.data._uid);
          } else {
            alert('nonMember save Board with ID: ' + board.data._uid);
          }
        })
        .catch((error) => {
          // ??? throw error;
          alert('Error adding document: ' + error);
        });
    },
    read: () => {
      //
    },
    update: () => {
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
