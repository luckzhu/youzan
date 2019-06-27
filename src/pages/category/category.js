import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'


new Vue({
    el: '#app',
    components: {
        Foot
    },
    data: {
        topLists: null,
        topIndex: 0,
        rankData: null,
        subData: null
    },
    created() {
        this.getTopList()
        this.getSublist(0,0)
    },
    methods: {
        getTopList() {
            axios.get(url.topList)
                .then(res => {
                    this.topLists = res.data.lists
                }).catch(err => {
                    console.log(err)
                })
        },
        getSublist(id, index) { 
            this.topIndex = index
            if (index === 0) {
                this.getRank()
            } else {
                axios.get(url.subList, { id }).then(res => {
                    this.subData = res.data.data
                })
            }

        },
        getRank() {
            axios.get(url.rank).then(res => {
                this.rankData = res.data.data
            })
        }
    },
   

})