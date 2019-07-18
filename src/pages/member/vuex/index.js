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
        init(state, lists) {
            state.lists = lists
        },
        add(state, instance) {
            state.lists.push(instance)
        },
        remove(state, id) {
            let index = state.lists.findIndex(item => {
                return item.id = id
            })
            state.lists.splice(index, 1)
        },
        update(state, instance) {
            //深复制，为了watch能监听到update的变化
            let lists = JSON.parse(JSON.stringify(state.lists))
            let { id } = instance
            let index = lists.findIndex(item => {
                return item.id = id
            })
            lists[index] = instance
            //还原
            state.lists = lists
        },
        setDefault(state, id) {
            state.lists.forEach(item => {
                item.isDefault = (item.id === id) ? true : false
            });
        }

    },
    //当需要异步时，用来触发mutations
    actions: {
        getList({ commit }) {
            Address.lists().then(res => {
                commit('init', res.data.lists)
            })
        },
        addAction({ commit }, instance) {
            axios.post(url.addAddress, instance).then(res => {
                commit('add', instance)
            })
        },
        removeAction({ commit }, id) {
            axios.post(url.removeAddress, id).then(res => {
                commit('remove', id)
            })
        },
        updateAction({ commit }, instance) {
            axios.post(url.updateAddress, instance).then(res => {
                commit('update', instance)
            })
        },
        setDefaultAction({ commit }, id) {
            axios.post(url.setDefaultAddress, id).then(res => {
                commit('setDefault', id)
            })
        }

    }
})

export default store


