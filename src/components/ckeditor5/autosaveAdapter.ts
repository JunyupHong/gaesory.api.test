import firebase from '@/api/initialize.firebase';

const storage = firebase.storage();
const ref = storage.ref();

function saveData(data: string) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // await ref.child('jijijij').putString(data);
      // const a = await ref.child('jijijij').getDownloadURL();
      // if (!board1) {
      //   board1 = new Board({
      //     _writerUid: 'writer',
      //     _password: null,
      //     _initBoardName: '개소리게시판',
      //     _boardNumber: 1,
      //     _fileUids: ['fileuid11', 'fileuid222'],
      //     _htmlUid: a,
      //     _title: data,
      //   });
      //   board1.save();
      // } else {
      //   //
      // }
      resolve();
    }, 1000);
  });
}

export default saveData;
