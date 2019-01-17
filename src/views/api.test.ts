import editor from '@/components/ckeditor5/ckeditor5.vue';
import { Board } from '@/api';
import uuid from 'uuid/v4';

export default {
  data() {
    return {
      board1: new Board(uuid(), 'Editing'),
    };
  },
  components: {
    ckeditor: editor,
  },
  methods: {
    async existCheck() {
      console.log(await Board.existAtCreatingByWriterUid('1'));
      console.log(await Board.existAtEditingByWriterUid('1'));
    },

    async createCreatingBoard() {
      const board = new Board(uuid(), 'Creating');
      // await
      await board.save();
    },
    async createEditingBoard() {
      const board = new Board(
        '4a6b5550-49e5-4502-9268-a60db4618e5f',
        'Editing',
      );
      await board.save();
    },
    async createPublishedBoard() {
      const board = await Board.loadAtEditing(
        '1a632851-24f5-4d9e-b366-c56b6a137492',
      );
      board.data.publish();
    },
    async loadBoard() {
      // console.log(await Board.load('29f4b9a0-9947-4ff7-9c9d-ecabc09b3ed0'));
    },
    async deleteBoard() {
      // console.log(await Board.delete('29f4b9a0-9947-4ff7-9c9d-ecabc09b3ed0'));
    },
    send(this: any) {
      const html = this.$refs.defaultEditor.returnHtml();
      console.log(html);
    },
  },
};
