<template>
  <div class="apiTest">
    <div class="test"> Post Test
      <input type="text"
             placeholder="writerUid"
             v-model="postWriterUid">
      <input type="text"
             placeholder="passward 선택!"
             v-model="postPassword">
      <input type="text"
             placeholder="initBoardName"
             v-model="postInitBoardName">
      <input type="number"
             placeholder="postNumber"
             v-model="postNumber">
      <input type="text"
             placeholder="title"
             v-model="postTitle">
      <input type="text"
             placeholder="htmlUid"
             v-model="postHtmlUid">
      <input type="text"
             placeholder="fileUid"
             v-model="postFileUid[0]">
      <button @click="createPost">Save Post</button>
    </div>
    <div class="test"> File Test
      <input type="file"
             accept=".jpg, .jpeg, .png"
             ref="fileInput"
             @change="createFile">

      <button @click="createFile">Save File</button>
    </div>
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