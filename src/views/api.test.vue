<template>
  <div class="apiTest">
    <div class="test"> Error Test

    </div>
    <div class="test"> Board Test
      <button @click="aaaa">aaaa</button>

    </div>

    <!-- <ckeditor ref="defaultEditor"></ckeditor> -->
    <ckeditor :toolbarType="'comment'"
              ref="commentEditor"></ckeditor>
    <button ref="defaultEditorButton"
            @click="clickDefaultEditorButton">defaultEditor</button>
    <button ref="commentEditorButton"
            @click="clickCommentEditorButton">commentEditor</button>
  </div>
</template>

<script lang="ts">
import script from '@/views/api.test.ts';
export default script;
</script>

<style scoped lang="scss">
.apiTest {
  width: 100vw;
  height: 100vh;
  border: solid 1px;
}
button {
  width: 100px;
  height: 30px;
  background: #e4e4e4;
  margin: 30px;
}
.test {
  margin: 30px 10px;
  padding: 0 0 0 20px;
  background: #ccc;
  input {
    margin: 10px;
  }
}
</style>