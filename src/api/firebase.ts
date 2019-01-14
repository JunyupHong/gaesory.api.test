import firebase from './initialize.firebase';
import Board from './Board';
import Response from './Response';

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const firebaseAuth = {};

const firebaseDB = {
  user: {
    create: () => {
      //
    },

    read: (uid: string): object => {
      return {};
    },

    update: () => {
      //
    },

    delete: () => {
      //
    },
  },
  board: {
    create(board: Board): Promise<null> {
      // TODO data만 저장
      return new Promise((resolve, reject) => {
        db.collection('boards')
          .doc(board.uid)
          .set(board)
          .then((docRef) => {
            console.log('success board api create with ID: ' + board.uid);
            resolve();
          })
          .catch((e) => {
            reject(new Error());
          });
      });
    },
    read(id) {
      return new Promise((resolve, reject) => {
        db.collection('boards')
          .doc(id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('success board api read with ID: ' + id);
              resolve(new Response(true).data(doc.data()));
            } else {
              reject();
            }
          })
          .catch((e) => {
            reject();
          });
      });
    },
    update() {
      //
    },
    delete() {
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
    create: () => {
      //
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
