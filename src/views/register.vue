<template>
<div class="connar">
  <!-- <h2>注册界面</h2> -->
  <div class="register position">
    <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model.number="registerUser.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input  v-model.number="registerUser.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerUser.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
      </el-form-item>

      <el-form-item label="选择身份">
        <el-select v-model="registerUser.identity" placeholder="请选择身份">
          <el-option label="管理员" value="manager"></el-option>
          <el-option label="员工" value="employee"></el-option>
        </el-select>
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
export default {
  name:"register",
  components:{},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name:'',
        email:'',
        password: '',
        checkPass: '',
        identity: ''
      },
      rules: {
        name: [
          {required:true,message:"内容不能为空",trigger:'blur'},
          {min:2,max:30,message:"长度在2-30个字符之间"}
        ],
        email:[
          {type:"email", required:true,message:"邮箱格式不正确",trigger:'blur'}
        ],
        password: [
          {required:true,message:"密码不能为空",trigger:'blur'},
          {min:6,max:30,message:"长度在6-30个字符之间"}
        ],
        checkPass: [
          {required:true,message:"密码不能为空",trigger:'blur'},
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log(this.registerUser);
          this.$axios.post("/api/users/register",this.registerUser)
          .then(res =>{
            //注册成功
            this.$message({
              message:'账号注册成功！',
              type:"success"
            });
            //注册成功后进行路由跳转
            this.$router.push('/login');
          })
          .catch(err =>console.log("出现错误"));
        } else {
          console.log('内容不完整，注册失败!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>
<style scoped>
.connar{
  height: 100vh;
  width: 100%;
  background:url("../assets/bgi.jpg");
}
.connar h2{
  line-height: 150px;
  color: #f1f2f6;
}
  .register{
  margin-top: 60px;
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
</style>
