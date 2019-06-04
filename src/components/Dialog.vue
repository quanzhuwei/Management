<template>
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <el-form ref="form" :model="formData"  :rules="rules" label-width="100px" size="small">
        <el-form-item label="收支类型：">
          <el-select v-model="formData.type" placeholder="选择收支类型">
            <el-option v-for="(item,index) in type_list"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop='describe' label="收支描述：">
          <el-input type="describe"  v-model="formData.describe" placeholder="请输入收支描述"></el-input>
        </el-form-item>
        <el-form-item prop='income' label="收入：">
          <el-input  type="income" v-model.number="formData.income" placeholder="请输入收入"></el-input>
        </el-form-item>
        <el-form-item prop='expend' label="支出：">
          <el-input type="expend" v-model.number="formData.expend" placeholder="请输入支出"></el-input>
        </el-form-item>
        <el-form-item prop='cash' label="账户现金：">
          <el-input type="cash" v-model.number="formData.cash" placeholder="请输入账户现金"></el-input>
        </el-form-item>
        <el-form-item  label="备注：">
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')"> 确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name:'dialog',
  props:{
    dialog:Object,
    formData:Object
  },
  data() {
    return {
      rules:{
        describe:[
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        income:[
          { required: true,  message: '收入不能为空', trigger: 'blur' },
        ],
        expend:[
          { required: true, message: '支出不能为空', trigger: 'blur' },
        ],
        cash:[
          { required: true, message: '账户不能为空', trigger: 'blur' },
        ]
      },
      type_list:["提现","转账","充值","优惠券","提现手续费","充值礼券"],
    };
  },
  methods: {
    onSubmit(form){
      this.$refs[form].validate(valid =>{
        if(valid){
          //console.log(this.formData);
          const url = this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`;
          //console.log(url);
          this.$axios.post(`/api/profiles/${url}`,this.formData).then(res =>{
            this.$message({
              message:"操作成功！",
              type:'success'
            })
            this.dialog.show = false;
            this.$emit('update');
          })
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
 .el-form-item{
   margin-bottom: 15px;
 }
 .pt0 {
    padding-top:0px;
}
</style>
