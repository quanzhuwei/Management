<template>
  <div class="index">
    <HeadNav></HeadNav>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff">
          <router-link to="/home">
            <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span>首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="item in items">
            <el-submenu  v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class='item.icon'></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                  <el-menu-item :index="citem.path" @click="addTag(citem)">
                    <span>{{citem.name}}</span>
                  </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <Taglog :dynamicTags="dynamicTags"></Taglog>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
import Taglog from '../components/Taglog'
export default {
  name:"index",
  components:{
    //挂载HeadNav组件
    HeadNav,
    Taglog
  },
  data() {
    return {
      tagPath:[],
      dynamicTags: [],
      items:[
        {
          icon:'el-icon-document',
          name:'资金管理',
          path:'fund',
          children:[
            {path:'fundlist',name:'资金流水'}
          ]
        },
        {
          icon:'el-icon-setting',
          name:'信息管理',
          path:'info',
          children:[
            {path:'infoshow',name:'个人信息'}
          ]
        },
      ]
    };
  },
  methods: {
    addTag(item){
      if(this.dynamicTags.indexOf(item) == -1){
        this.dynamicTags.push(item);
      }
    }
  }

}

</script>
<style lang="scss" scoped>

$height:60px;
  .index{
    display: flex;
    flex-direction: column;
    min-height: 100%
  }
  .el-aside {
    background-color: rgb(84, 92, 100);
    overflow: hidden;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    //去除滚动条
    overflow: hidden;
    min-width: 420px;
    padding: 0;
  }
  
.el-container {
  display: flex;
  flex: 1;
  }
  .el-menu {
    border-right: solid 1px rgb(84, 92, 100);
  }
  // span{
  //   color: #fff;
  //   font-size: 14px;
  // }
</style>

