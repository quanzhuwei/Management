import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const types = {
  SET_AUTENTICATED :'SET_AUTENTICATED',
  SET_USER : 'SET_USER'
};

const state = {   //要设置的全局访问的state对象
  isAutenticated: false,
  user: {}
  //要设置的初始属性值
};
const getters = {
  isAutenticated :state =>state.isAutenticated,
  user: state =>state.user
};
const mutations = {
  SET_AUTENTICATED(state,isAutenticated){
    if (isAutenticated) state.isAutenticated = isAutenticated;
    else isAutenticated = false;
  },
  SET_USER(state,user){
    if (user) {
      state.user = user;
      state.user.time = Date();
    }
    else user = {};
  }
};
const actions = {
  setAutenticated:({commit},isAutenticated) =>{
    commit(types.SET_AUTENTICATED,isAutenticated);
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user);
  },
  // setAutenticated(context,isAutenticated){
  //   context.commit(types.SET_AUTENTICATED,isAutenticated);
  // },
  // setUser(context,user){
  //   context.commit(types.SET_USER,user);
  // }
  //设置注销，清空state内容
  clearCurrentState:({commit}) =>{
    commit(types.SET_AUTENTICATED,false);
    commit(types.SET_USER,null);
  }
};


const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
 
export default store;