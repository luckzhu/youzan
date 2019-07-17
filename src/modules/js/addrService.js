import fetch from './fetch.js'
import url from './api.js'

class Address {
    static lists(){
        return fetch(url.addressLists)
    }
    
    static add(data){
        return fetch(url.addAddress,data)
    }

    static remove(id) {
        return fetch(url.removeAddress,id)
    }
    
    static update(data) {
        return fetch(url.updateAddress,data)
    }

    static setDefault(id) {
        return fetch(url.setDefaultAddress,id)
    }
}

export default Address