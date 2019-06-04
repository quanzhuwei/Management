<template>
  <div class="taglog" v-if="dynamicTags.length > 0">
    <div class="tagitem" v-for="tag in dynamicTags" :key="tag.name">
      <router-link :to="tag.path">
        <el-tag
          closable
          :disable-transitions="false"
          size="mini"
          @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    dynamicTags:Array,
  },
  data() {
    return {
      inputVisible: false
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
  }
}
</script>
<style lang="scss" scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .taglog{
    padding:2px 20px 2px 10px;
    width: auto;
    background-color: #fff;
    box-shadow: 0 1px 1px #82ccdd;
  }
  .tagitem{
    display: inline;
    margin-right: 5px;
  }
</style>
