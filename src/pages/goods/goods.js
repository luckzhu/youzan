import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_animation.css'

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
        id,
        goodsDetails: null,
        bannerList: [],
        buttons: buttons,
        curIndex: 0,
        dealLists: null,
        showSku: false,
        skuType: 1,
        buyNumber: 1,
        addCartSuccess: false,
        addCartMessage: false
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
        changeButton(index) {
            this.curIndex = index
            axios.get(url.goodsDeals, { id }).then(res => {
                this.dealLists = res.data.data
            })
        },
        addSku(index) {
            this.skuType = index
            this.showSku = true
        },
        skuCancel() {
            this.showSku = false
        },
        changeNumber(num) {
            if (num < 0 && this.buyNumber === 1) return
            this.buyNumber += num
        },
        addCart() {
            axios.post(url.addCart, {
                id,
                number: this.buyNumber
            }).then(res => {
                if (res.data.status === 200) {
                    this.showSku = false
                    this.addCartSuccess = true
                    this.addCartMessage = true

                    setTimeout(() => {
                        this.addCartMessage = false
                    }, 2000);
                }

            })
        }

    },
    watch: {
        showSku(val, oldVal) {
            document.body.style.overflow = val ? 'hidden' : 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.body.height = val ? '100%' : 'auto'
            document.querySelector('html').height = val ? '100%' : 'auto'
        }
    },
    mixins: [mixin]
})