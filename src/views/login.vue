<template>
<div class="connar">
  <!-- <h2>登录界面</h2> -->
  <div class="login position">
    <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email">
        <el-input  v-model="loginUser.email" autocomplete="off" placeholder="请输入正确的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
        <div class="toregister"> 
          <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
        </div>
      </el-form-item>
      
    </el-form>
  </div>
  </div>
</template>
<script>
//引入token解析
import jwt_decode from 'jwt-decode';
export default {
  name:"login",
  components:{},
  data() {
    return {
      loginUser: {
        email: '',
        password: '',
        time:new Date()
      },
      rules: {
        email: [
           {type:"email",required:true,message:"请输入正确的邮箱",trigger:'blur'}
        ],
        password: [
           {required:true,message:"请输入密码",trigger:'blur'}
        ],
      }
    };
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
    //登录提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log(this.loginUser);
          this.$axios.post("/api/users/login",this.loginUser)
          .then(res =>{
            //登录成功
            //console.log(res);
            //保存token
            const { token } = res.data;
            localStorage.setItem("eleToken",token);
            //解析token
            const decoded = jwt_decode(token);
            //console.log(decoded);
            //将token存储到vuex中
            this.$store.dispatch("setAutenticated",!this.isEmpty(decoded));
            this.$store.dispatch("setUser",decoded);
            //console.log(this.$store.state.user);
            this.$message({
              message:'登录成功！',
              type:"success"
            });
            this.$router.push('/index');
          })
          .catch(err =>console.log("出现错误"));
          //登录成功后进行路由跳转
          
        } else {
          console.log('登录失败!!');
          return false;
        }
      });
    },
    
  }
}
</script>
<style scoped>
.connar{
  height: 100vh;
  width: 100%;
  background:url("../assets/bgi.jpg");
  margin: 0;
  padding: 0;
}
.connar h2{
  line-height: 150px;
  color: #f1f2f6;
}
  .login{
    padding: 20px 40px 0px 20px;
    width: 350px;
    margin: 0 auto;
    background-color:#f1f2f6;
    box-shadow: 0 0 3px #fff;
    border-radius: 5px;
  }
  .position{
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .toregister{
    text-align: right;
    font-size: 14px;
  }
</style>
