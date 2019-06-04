<template>
  <div class="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class=" item"> <i class="el-icon-s-custom"></i> <div class="text">{{user.name}}</div> </div>
      <div class=" item"><i class="el-icon-s-tools"></i> <div class="text">  {{user.identity === 'manager' ? '管理员':'普通员工'}}</div></div>
      <div class=" item"><i class="el-icon-alarm-clock"></i> <div class="text"> {{user.time | formatDate}}</div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  },
  filters:{
    formatDate:function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
.box-card {
  width: 480px;
  margin-top: 100px;
  }
  .text {
    font-size: 14px;
    float: right;
    margin-right: 50px;
  }

  .item {
    font-size: 20px;
    margin-bottom: 18px;
  }
</style>
