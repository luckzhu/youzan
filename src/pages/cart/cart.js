import './cart.css'
import './cart_trade.css'
import './cart_base.css'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'
import Velocity from 'velocity-animate'
import Cart from 'js/cartService.js'

import { MessageBox } from 'mint-ui';



new Vue({
    el: '.container',
    data: {
        lists: null,
        totalPrice: 0,
        editShop: null,
        editShopIndex: -1
    },
    computed: {
        allSlected: {
            get() {
                if (this.lists && this.lists.length) {
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal) {
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    });
                });
            }
        },

        allRemoveSlected: {
            get() {
                if (this.editShop.removeChecked) {
                    return true
                }
                return false
            },
            set(newVal) {
                this.editShop.removeChecked = newVal
                this.editShop.goodsList.forEach(good => {
                    good.removeChecked = newVal
                });
            }
        },

        selectedList() {
            let arr = []
            let total = 0
            if (this.lists && this.lists.length) {
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.number * good.price
                        }
                    })
                })
            }
            this.totalPrice = total
            return arr
        },

        removedList() {
            let arr = []
            if (this.editShop) {
                this.editShop.goodsList.forEach(good => {
                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }

    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            axios.get(url.cartList).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.checked = true
                    shop.removeChecked = false

                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false
                    });
                });
                this.lists = lists
            })
        },
        changeShop(shop) {
            let attr = this.editShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            });
        },
        changeChecked(shop, good) {
            let attr = this.editShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },

        changeAllSelected() {
            let attr = this.editShop ? 'allRemoveSlected' : 'allSlected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item, i) => {
                if (shopIndex != i) {
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })

            if (shop.editing) {
                this.editShop = shop
                this.editShopIndex = shopIndex
            }
            else {
                this.editShop = null
                this.editShopIndex = -1
            }

        },
        plusGoods(good) {
            Cart.add(good.id).then(res=>{
                good.number++
            })
            // axios.post(url.addCart, {
            //     id: good.id,
            //     number: 1
            // }).then(res => {
            //     good.number++
            // })
        },
        minusGoods(good) {
            if (good.number === 1) return
            Cart.reduce(good.id).then(res=>{
                good.number--
            })
            // axios.post(url.reduceCart, {
            //     id: good.id,
            //     number: 1
            // }).then(res => {
            //     good.number--
            // })
        },
        removeGood(shop, shopIndex, good, goodIndex) {
            MessageBox.confirm('确定删除此商品吗?').then(action => {
                axios.post(url.removeCart, {
                    id: good.id
                }).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if (!shop.goodsList.length) {
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                })
            })
        },
        removeShop() {
            this.editShop = null
            this.editShopIndex = -1
            this.lists.forEach((shop) => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        start(e, good) {
            good.startX = e.changedTouches[0].clientX
        },
        end(e, shopIndex, good, goodIndex) {
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if (good.startX - endX > 100) {
                left = '-60px'
            } else if (endX - good.startX > 100 || !goodIndex) {
                left = '0px'
            }

            Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
                left
            })
        }
    },
    mixins: [mixin]
})