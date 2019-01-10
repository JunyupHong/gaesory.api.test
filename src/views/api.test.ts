import api from '@/firebase/api.firebase';
import { Post, User } from '@/class';

export default {
  data() {
    return {
      postWriterUid: '',
      postPassword: '',
      postInitBoardName: '',
      postNumber: 0,
      postTitle: '',
      postHtmlUid: '',
      postFileUid: [''],
    };
  },
  methods: {
    async createFile(this: any) {
      // console.log(this.$refs.fileInput.files);
      api.firebaseStorage.file.create(this.$refs.fileInput.files[0]);
    },
    // ??? this: any 써도됨?
    async createPost(this: any) {
      const post = new Post({
        _writerUid: null,
        _password: null,
        _initBoardName: this.postInitBoardName,
        _postNumber: this.postNumber,
        _title: this.postTitle,
        _htmlUid: this.postHtmlUid,
        _fileUids: this.postFileUid,
      });
      await post.save();
    },
  },
};
