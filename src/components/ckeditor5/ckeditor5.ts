import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import MyCustomUploadAdapterPlugin from '@/components/ckeditor5/uploadAdapter.ts';
import autosaveAdapter from '@/components/ckeditor5/autosaveAdapter.ts';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; // <— ADDED
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import AutoSave from '@ckeditor/ckeditor5-autosave/src/autosave';
import MyUploadAdapter from '@/components/ckeditor5/uploadAdapter.ts';
import { Board } from '@/api';

export default {
  data() {
    return {
      editor: null,
    };
  },
  props: {
    toolbarType: {
      type: String,
      default: 'board',
    },
    board: {
      type: Board,
      required: true,
    },
  },
  methods: {
    returnHtml(this: any) {
      return this.editor.getData();
    },
  },
  mounted(this: any) {
    let toolbarArray: string[] = [];
    if (this.toolbarType === 'board') {
      // console.log('board');
      toolbarArray = [
        'heading',
        '|',
        'alignment', // <— ADDED
        'bold',
        'italic',
        'highlight',
        'link',
        'imageUpload',
        'mediaEmbed',
        'undo',
        'redo',
      ];
    } else if (this.toolbarType === 'comment') {
      // console.log('comment');
      toolbarArray = ['link', 'imageUpload', 'mediaEmbed', 'undo', 'redo'];
    }
    ClassicEditor.create(document.querySelector('#editor'), {
      plugins: [
        Essentials,
        Bold,
        Italic,
        BlockQuote,
        EasyImage,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Link,
        List,
        Paragraph,
        Alignment,
        Highlight,
        MediaEmbed,
        AutoSave,
      ],
      toolbar: {
        items: toolbarArray,
      },
      image: {
        // You need to configure the image toolbar, too, so it uses the new style buttons.
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight',
        ],

        styles: ['full', 'alignLeft', 'alignRight'],
      },
      autosave: {
        save(editor) {
          return autosaveAdapter(editor.getData());
        },
      },

      extraPlugins: [MyCustomUploadAdapterPlugin],
    })
      .then((newEditor: object) => {
        this.editor = newEditor;
        this.editor.plugins.get(
          'FileRepository',
        ).createUploadAdapter = (loader) => {
          return new MyUploadAdapter(loader, this.board);
        };
      })
      .catch((error: object) => {
        // console.error(error);
      });
  },
};
