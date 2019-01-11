// import firebase from 'firebase';

// // Initialize Firebase
// const config = {
//   apiKey: 'AIzaSyBg5_ZISebZkorGZA3NT2ZO7LuTHDNNUWQ',
//   authDomain: 'gaesory-ec24c.firebaseapp.com',
//   databaseURL: 'https://gaesory-ec24c.firebaseio.com',
//   projectId: 'gaesory-ec24c',
//   storageBucket: 'gaesory-ec24c.appspot.com',
//   messagingSenderId: '752962651932',
// };
// firebase.initializeApp(config);

import firebase from '@/firebase/initialize.firebase';
import api from '@/firebase/api.firebase';
import { Board } from '@/class';

const storage = firebase.storage();
const ref = storage.ref();

let board1: Board;

function saveData(data: string) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await ref.child('jijijij').putString(data);
      const a = await ref.child('jijijij').getDownloadURL();
      // console.log('data', data);
      if (!board1) {
        board1 = new Board({
          _writerUid: 'writer',
          _password: null,
          _initBoardName: '개소리게시판',
          _boardNumber: 1,
          _fileUids: ['fileuid11', 'fileuid222'],
          _htmlUid: a,
          _title: data,
        });
        board1.save();
      } else {
        //
      }
      resolve();
    }, 1000);
  });
}

export default saveData;
