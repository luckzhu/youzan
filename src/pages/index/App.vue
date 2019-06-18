<template>
  <div id="app">
    <ul>
      nihao 
      <li v-for="list in lists" :key="list.id">
        <img :src="list.img" alt="">
        {{list.name}}
        {{list.price}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      lists: null
    };
  },
  created(){
    this.getData()
  },
  methods: {
    getData() {
      let _this = this
      this.$http
        .get("http://rap2api.taobao.org/app/mock/222071/index/hotLists")
        .then(function(res) {
          _this.lists = res.data.lists;
        }).catch(function(err){
          console.log(err)
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
