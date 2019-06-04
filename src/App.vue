入口组件
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//引入token解析
import jwt_decode from 'jwt-decode';
export default {
  name: 'App',
  comments:{},
  created() {
    if(localStorage.eleToken){
      const decoded = jwt_decode(localStorage.eleToken);
      //console.log(decoded);
      //将token存储到vuex中
      this.$store.dispatch("setAutenticated",!this.isEmpty(decoded));
      this.$store.dispatch("setUser",decoded);
    }
  },
  methods: {
    //判断变量是否为空  空返回true
    isEmpty(value){
      return (
        value === undefined ||
        value === null  ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
}
</script>

<style>
html,
body,
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  height: 100%;
}
a{
  text-decoration: none;
}
.clearfix{
  zoom: 1;
}
.clearfix::before,
.clearfix::after{
  content: '';
  clear: both;
  display: table;
}
</style>
