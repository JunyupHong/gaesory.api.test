<template>
  <div class="apiTest">
    <div class="test"> Error Test
      <button @click="createError">Make Error</button>
    </div>
    <div class="test"> Board Test
      <button @click="createBoardByMember">Save Board by Member</button>
      <button @click="createBoardByNonMember">Save Board by NonMember</button>
      <button @click="getBoardData">Get Board Data</button>
      <button @click="getAllBoardData">Get All Board Data</button>

    </div>

    <div class="test"> File Test
      <input type="file"
             accept=".jpg, .jpeg, .png"
             ref="fileInput"
             @change="createFile">

      <button @click="createFile">Save File</button>
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