import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'

import Swipe from 'components/Swipe.vue'

let { id } = qs.parse(location.search.substr(1))
let buttons = [
    {
        name: '商品详情'
    },
    {
        name: '本店成交'
    },
]

new Vue({
    el: '#app',
    data: {
        goodsDetails: null,
        bannerList: [],
        buttons: buttons,
        curIndex: 0,
        dealLists: null
    },
    components: {
        Swipe
    },
    created() {
        this.getGoods()
    },
    methods: {
        getGoods() {
            axios.get(url.goodsDetails, { id }).then(res => {
                this.goodsDetails = res.data.data
                this.goodsDetails.imgs.forEach(element => {
                    this.bannerList.push({
                        clickUrl: '',
                        img: element
                    })
                });
            })
        },
        changeButton(index){
            this.curIndex = index
            axios.get(url.goodsDeals,{id}).then(res => {
                this.dealLists = res.data.data
            })
        }
        
    },
    mixins: [mixin]
})