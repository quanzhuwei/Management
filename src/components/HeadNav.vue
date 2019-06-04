
自定义HeadNav组件
<template>
  <header class="head-nav">
    <el-row :gutter="24">
      <el-col :span="6"><span>资金后台管理系统</span></el-col>
      <el-col :span="6" :offset="12">
        <div class="userinfo">
          <div class="welcome">欢迎</div>
          <div class="name" trigger="click" @command="setDialogInfo">{{user.name}}</div>
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
               <router-link to="/info"> <el-dropdown-item command="info">个人信息</el-dropdown-item></router-link>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>


<script>
export default {
  name:'head-nav',
  comments:{},
  computed: {
    //获取本地登录用户信息
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    setDialogInfo(item){
      //console.log(item);
      switch(item){
        case "info": 
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList(){
      //console.log("个人信息");
    },
    logout(){
      //console.log("退出");
      //清除token
      localStorage.removeItem("eleToken");
      //清除vuex store
      this.$store.dispatch("clearCurrentState");
      //跳转到登录页面
      this.$router.push("/login")
    }
  }
}
</script>
<style lang="scss" scoped>
  .head-nav{
    height: 40px;
    min-width: 600px;
    padding: 10px;
    color: #fff;
    background-color:rgb(84, 92, 100);
    border-bottom: 1px solid #353b48;
    overflow: hidden;
  }
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
      line-height: 40px;
    }
    span{
      font-size: 16px;
      font-weight: 900;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .userinfo{
    font-size: 14px;
    display: -webkit-flex;
    display: flex;
    justify-content:flex-end;
    .name{
      padding: 0px 5px 0px 20px;
      color: #409EFF;
    }
  }
  .el-icon-caret-bottom::before {
    font-size: 12px;
    color: #fff;
  }
  .el-dropdown-menu__item {
    line-height: 24px;
    font-size: 14px;
    min-width: 60px;
}
</style>
