<template>
  <div class="fund">
    <el-row>
      <el-col :span="20" class="mt5">
        <el-form :model="searchData" ref="add_date" :inline="true" label-width="120px" size="small">
          <el-form-item label="按照时间查询:">
            <el-date-picker
              v-model="searchData.stratTime"
              type="datetime"
              placeholder="开始时间"
              size="small">
            </el-date-picker>
            --
            <el-date-picker
              v-model="searchData.endTime"
              type="datetime"
              placeholder="结束时间"
              size="small">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="btnRighr">
            <el-button type="primary" icon="search" @click="handleSearch()" size="small">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-form :inline='true' ref="add_data">
          <el-form-item class="btnRighr">
            <el-button type="primary" @click="handleAdd()" v-if="user.identity == 'manager'" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
      <!-- 表格信息start -->
    <el-table resizable="true" v-if="tableData.length > 0" :data="tableData" style="width: 100%" border>
      <el-table-column align='center' type='index' label="序号" width="50"></el-table-column>
      <el-table-column align='center' prop='date' label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.date|formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align='center' prop='type' label="收支类型" width="120"></el-table-column>
      <el-table-column align='center' prop='describe' label="收支描述" width="150"></el-table-column>
      <el-table-column align='center' prop='income' label="收入" width="80">
        <template slot-scope="scope">
          <span style="color:#f6b93b">{{scope.row.income}}</span>
        </template>
      </el-table-column>
      <el-table-column  align='center' prop='expend'  label="支出" width="80">
        <template slot-scope="scope">
          <span style="color:#6a89cc">{{scope.row.expend}}</span>
        </template>
      </el-table-column>
      <el-table-column  align='center' prop='cash'  label="账户现金" width="100">
        <template slot-scope="scope">
          <span style="color:#e55039">{{scope.row.cash}}</span>
        </template>
      </el-table-column>
      <el-table-column  align='center' prop='remark'  label="备注" width="180"></el-table-column>
      <el-table-column v-if="user.identity == 'manager'" align='center' label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type='warning'
            icon='edit'
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon='delete'
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格信息end -->
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paginations.index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total">
      </el-pagination>  
    </div>
    <!-- 弹出信息窗口start -->
    <myDialog :dialog = "dialog" :formData="formData" @update="getProfile"></myDialog>
  </div>
</template>
<script>
import myDialog from "./Dialog"
export default {
  name:'fundlist',
  components:{
    myDialog,
  },
  //时间格式过滤器
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
  },
  computed: {
    user(){
     return this.$store.getters.user;
    }
  },
  data() {
    return {
      //时间筛选数据
      searchData:{
        stratTime:'',
        endTime:''
      },
      //刷选数据后存储的数据容器
      filterData:[],
      //从数据库获取的数据
      tableData:[],
      allTableData:[],
      dialog:{
        show:false,
        title:'',
        option:"edit"
      },
      //表格中的数据
      formData:{
        id:'',
        type: '',
        describe: '',
        income:'',
        expend:'',
        cash:'',
        remark:''
      },
      //初始化分页属性
      paginations:{
        page_index: 1 , //当前位于哪页
        total:0,        //总条数
        page_size: 5 ,   //每页显示条数
        page_sizes:[5,10,15,20,50],   //每页条数选择
        layout:"total, sizes, prev, pager, next, jumper"
      }
    }
  },
  created() {
    this.getProfile();
  },
  
  methods: {
    //获取数据
    getProfile(){
      this.$axios.get('/api/profiles').then(res =>{
        //console.log(res.data);
        this.allTableData = res.data;
        this.filterData = res.data;
        this.setPaginations();
      })
    },
    //添加数据
    handleAdd(){
      this.dialog.show = true;
      this.dialog.title ='添加资金信息';
      this.dialog.option = 'add';
      this.formData={
        id:'',
        type: '',
        describe: '',
        income:'',
        expend:'',
        cash:'',
        remark:''
      }
    },
    //编辑数据
    handleEdit(index, row) {
      //console.log(index, row);
      this.dialog.show = true;
      this.dialog.title ='修改资金信息';
      this.dialog.option = 'edit';
      this.formData = {
        id:row._id,
        type:row.type,
        describe: row.describe,
        income:row.income,
        expend:row.expend,
        cash:row.cash,
        remark:row.remark,
      }
    },
    //删除数据
    handleDelete(index, row) {
     //console.log(index, row);
     this.$axios.delete(`/api/profiles/delete/${row._id}`)
     .then(res =>{
       this.$message('删除成功！');
       this.getProfile();
     })
    },
    //初始化分页器数据
    setPaginations(){
      this.paginations.total  = this.allTableData.length;
      this.paginations.index  = 1;
      this.paginations.page_size = 5;
      //对每页显示的总数据赋值,filter方法返回索引小于5的数据,实现过滤功能
      this.tableData = this.allTableData.filter((items,index) =>{
        return index < this.paginations.page_size;
      })
    },
    //定义每页条数
    handleSizeChange(page_size){
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      //对每页显示的总数据赋值
      this.tableData = this.allTableData.filter((items,index) =>{
        return index < page_size;
      })
    },
    //对每页数据进行赋值
    handleCurrentChange(page){
      //显示当前页
      let index = this.paginations.page_size * (page-1);
      //数据总条数
      let nums = this.paginations.page_size * page;
      //容器，并对它赋值
      let tables = [];
      for(let i = index ; i<nums ; i++){
        if(this.allTableData[i]){
          tables.push(this.allTableData[i]);
        }
      }
      this.tableData = tables;
    },
    //时间筛选功能
    handleSearch(){
      if(!this.searchData.stratTime || !this.searchData.endTime){
        this.$message({
          type:"warning",
          message:"请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const sTime = this.searchData.stratTime.getTime();
      const eTime = this.searchData.endTime.getTime();
      this.allTableData = this.filterData.filter(item =>{
        let date = new Date(item.date)
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      this.setPaginations();
    }
  },
}
</script>

<style lang="scss" scoped>
.fund{
  margin-top:2px;
}
.el-form-item {
    margin-bottom: 0px;
}
.pagination{
  // position: fixed;
  // right: 10px;
  // bottom: 10px;
  background-color: #E9EEF3;
  text-align: right;
  margin-right: 25px;
}
.clearfix{
  clear: both;
  zoom: 1;
}
.clearfix::before,
.clearfix::after{
  content: '';
  clear: both;
  display: table;
}
.mt5{
  margin-top: 5px;
}
</style>
