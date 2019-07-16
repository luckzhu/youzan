import fetch from './fetch'
import url from './api'

class Cart{
    static add(id){
        return fetch(url.addCart,{
            id,
            number: 1
        })
    }

    static reduce(id){
        return fetch(url.reduceCart,{
            id,
            number: 1
        })
    }
}

export default Cart