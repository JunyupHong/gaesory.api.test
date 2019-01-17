<template>
  <div class="apiTest">
    <div class="test"> Error Test

    </div>
    <div class="test"> Board Test
      <button @click="existCheck">exist check</button>
      <button @click="createCreatingBoard">createCreatingBoard</button>
      <button @click="createEditingBoard">createEditingBoard</button>
      <button @click="createPublishedBoard">createPublishedBoard</button>
      <button @click="loadBoard">load Board</button>
      <button @click="deleteBoard">delete Board</button>

    </div>

    <ckeditor ref="defaultEditor"
              :board="board1"></ckeditor>
    <button ref="sendButton"
            @click="send">send</button>
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