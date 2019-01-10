import api from '@/firebase/api.firebase';
import { Board, User } from '@/class';

export default {
  data() {
    return {};
  },
  methods: {
    createFile(this: any) {
      // console.log(this.$refs.fileInput.files);
      api.firebaseStorage.file.create(this.$refs.fileInput.files[0]);
    },
    // TODO this: any 대신 @component로 사용하는거 찾아보기
    createBoardByMember(this: any) {
      const board = new Board({
        _writerUid: '회원',
        _password: null,
        _initBoardName: '개소리 게시판',
        _boardNumber: 123,
        _title: '제목',
        _htmlUid: 'htmlUid',
        _fileUids: ['fileUid1', 'fileUid2'],
      });
      board.save();
    },
    createBoardByNonMember(this: any) {
      const board = new Board({
        _writerUid: null,
        _password: 'nonMember',
        _initBoardName: '개소리 게시판',
        _boardNumber: 123,
        _title: '제목',
        _htmlUid: 'htmlUid',
        _fileUids: ['fileUid1', 'fileUid2'],
      });
      board.save();
    },
  },
};
