let url = {
    hotLists: 'index/hotLists',
    bannerLists: 'index/banner',
    topList: 'category/topList',
    rank: 'category/rank',
    subList: 'category/subList',
    searchList: 'search/list',
    goodsDetails: 'goods/details',
    goodsDeals: 'goods/deal',
    addCart: 'cart/add',
    reduceCart: 'cart/reduce',
    removeCart: 'cart/remove',
    moreRemove: 'cart/mrremove',
    updateCart: 'cart/update',
    cartList: 'cart/list',
    addressLists: 'address/list',
    addAddress: 'address/add',
    removeAddress: 'address/remove',
    updateAddress: 'address/update',
    setDefaultAddress: 'address/setDefault'
    

}

//开发环境和真实环境的切换
//let host = ''
//现在用的是开发环境mock的接口数据
let host = 'http://rap2api.taobao.org/app/mock/7058/'

//把所有的url前面都加上host
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
    }
}

export default url