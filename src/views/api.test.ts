import editor from '@/components/ckeditor5/ckeditor5.vue';
import test from '@/api/firebase';
import testBoard from '@/api/Board';

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

    async aaaa() {
      await test.firebaseDB.board.create(new testBoard('1'));
      console.log('aa');
    },
  },
};
