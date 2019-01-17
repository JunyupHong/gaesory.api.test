import firebase from './initialize.firebase';
import BoardApi from './boardApi';
import { Board, Response, CardBoard } from './index';
import * as _ from 'lodash';
import BoardApiConfigure from './boardApi';

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const storage = firebase.storage();
const storageRef = storage.ref('boards');
const filesRef = storageRef.child('id');
const filePath = filesRef.fullPath;

const boardApi = new BoardApi<Board>(db, storage, {
  baseCollectionRoot: 'Boards',
  baseStorageRoot: 'Boards',
});
const cardBoardApi = new BoardApi<CardBoard>(db, storage, {
  baseCollectionRoot: 'CardBoards',
  baseStorageRoot: 'CardBoards',
});
export { boardApi, cardBoardApi };

// const firebaseAuth = {};

// const firebaseDB = {
//   user: {
//     create: () => {
//       //
//     },

//     read: (uid: string): object => {
//       return {};
//     },

//     update: () => {
//       //
//     },

//     delete: () => {
//       //
//     },
//   },
//   boards: {
//     board: new BoardApi<Board>({ ...}),
//     cardBoard: new BoardApi<CardBoard>({ ...}),
//   },
// };

// const firebaseStorage = {
//   file: {
//     create: () => {
//       //
//     },
//     delete: (id: string) => {
//       //
//     },
//     read: (id: string): object => {
//       return {};
//     },
//   },
//   html: {
//     create: (uid: string) => {
//       //
//     },
//     delete: async (uid: string) => {
//       //
//     },
//     update: async (uid: string, html: string) => {
//       //
//     },
//     read: async (uid: string): Promise<string> => {
//       return '';
//     },
//   },
// };
