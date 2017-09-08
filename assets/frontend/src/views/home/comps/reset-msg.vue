<!-- 重置消息组件 -->
<!-- 当一个组件的代码行数较少时[不超过两页]，可以直接写在一个文件中 -->

<style type="text/css">
  .box{
    width: 100px;
    height: 50px;
    margin: 20px 0;
    border: 1px solid #eee;
    text-align: center;
    border-radius: 10px;
    color:  black;
  }
  input.box{
    width: 250px;
    margin-right: 10px;
  }
</style>
<template>
<div>
  <input class="box" v-model='newMsg' placeholder="please input new message"></input>
  <button class="box" @click='reset()'>reset</button>
</div>
</template>
<script type="text/javascript">
export default {
  data: ()=>({
    newMsg: ''
  }),
  methods: {
    reset() {
      this.$store.commit('RESET_MSG', this.newMsg)
      this.newMsg = ''
    },
  }
}
</script>