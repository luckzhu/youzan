import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex插件
Vue.use(Vuex)

import axios from 'axios'
import url from 'js/api.js'
import Address from 'js/addrService'

//创建store实例
const store = new Vuex.Store({
    //类似于组件中data，但不能直接修改
    state: {
        lists: null
    },
    //用于修改state中的数据，同步的
    mutations: {
        init(state,lists){
            state.lists = lists
        }
    },
    //当需要异步时，用来触发mutations
    actions: {
        getList({commit}){
            Address.lists().then(res=>{
                commit('init',res.data.lists)
            })
        }
    }
})

export default store


