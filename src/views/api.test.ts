import api from '@/firebase/api.firebase';
import { Board, User, Error } from '@/class';
import editor from '@/components/ckeditor5/ckeditor5.vue';

export default {
  data() {
    return {};
  },
  components: {
    ckeditor: editor,
  },
  methods: {
    clickDefaultEditorButton() {
      // console.log('default');
    },
    clickCommentEditorButton() {
      // console.log('comment');
    },
    createError() {
      //
    },
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
    async getBoardData(id: string) {
      const ret = await Board.generate('3881501f-42ee-494f-b27a-10e2d3d391b0');
      // const ret = await Board.generate('29cba344-6a10-443d-91d3-072990f65c2c');
      alert('get BoardData complete' + ret);
      // console.log(ret);
    },
    async getAllBoardData() {
      const ret = await Board.generate();
      alert('get all BoardData complete' + ret);
      // console.log(ret);
    },
  },
};
