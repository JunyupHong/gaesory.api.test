// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
import firebase from '@/api/initialize.firebase';
import { boardApi } from '@/api/firebase';
import { Board } from '@/api';

const storage = firebase.storage();
const ref = storage.ref().child('test');

export default class MyUploadAdapter {
  private loader: any;
  private board: Board;

  constructor(loader: any, board: Board) {
    this.loader = loader;
    this.board = board;
  }

  public async upload() {
    // await ref.child(this.loader.id).put(this.loader.file);
    // const url = await ref.child(this.loader.id).getDownloadURL();
    const ret = await boardApi.createFile(this.board, this.loader.file);

    return {
      default: ret.data,
    };
  }

  public abort() {
    // if (this.xhr) {
    //   this.xhr.abort();
    // }
  }
}

// function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//     // Configure the URL to the upload script in your back-end here!
//     return new MyUploadAdapter(loader, '');
//   };
// }

// export default MyCustomUploadAdapterPlugin;
