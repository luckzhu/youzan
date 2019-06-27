import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'


new Vue({
    el: '.container',
    data: {
        searchLists: null,
        isShowGoTop: false,
    },
    created() {
        this.getSearchList()
    },
    methods: {
        getSearchList() {
            axios.get(url.searchList).then(res => {
                this.searchLists = res.data.lists
            })
        },
        showGotop() {
            console.log(document.body.scrollTop )
            var scrollTop = document.body.scrollTop ||document.documentElement.scrollTop
            if ( scrollTop > 300) {
                this.isShowGoTop = true
            } else {
                this.isShowGoTop = false
            }
        },
        goTop() {
            scrollTop = 0
        }

    },
    mixins: [mixin]
})