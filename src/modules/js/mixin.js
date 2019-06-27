let mixin = {
    filters:{
        priceFormat(price){
           return parseFloat(price).toFixed(2)
        }
    }
}

export default mixin