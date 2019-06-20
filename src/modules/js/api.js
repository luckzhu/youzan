let url = {
    hotLists: 'index/hotLists',
    bannerLists: 'index/banner'
}

//开发环境和真实环境的切换
//let host = ''
//现在用的是开发环境mock的接口数据
let host = 'http://rap2api.taobao.org/app/mock/222071/'

//把所有的url前面都加上host
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
    }
}

export default url