
const path = require('path');
const cartPage = require('../pages/cartPage.js')
const storePage = require('../pages/storePage.js')
const fs = require('fs')
let items = JSON.parse(fs.readFileSync('test/testData/tc2.json'))

module.exports={

        getTotalPrice()
        {
        //const getPrices = $$('div[class="col-sm-4 p-2"] p')
        //var qtys =$$("div[class='col-sm-2 p-2 text-center '] p")
        var tPrice =0
        for(var j=0;j<cartPage.getPrices.length;j++)
            {
                var itemPrice = parseFloat(cartPage.getPrices[j].getText().replace(/[^0-9.]/g,""))
                var itemQty = parseInt(cartPage.qtys[j].getText().replace(/[^0-9.]/g,""))
                tPrice += itemPrice*itemQty
         
            }
        return tPrice
        },

        deleteCartItems()
        {

            for (var i =0;i<items[0].qty;i++){
                cartPage.cartItemDel.click()
                   }
        },

        getCartValue()
        {
            //const str = storePage.cart.getText()
            const cartValue = storePage.cart.getText().replace(/[^0-9]/g,"")
            return cartValue
        },

        getCartItemsPrice()
        {

            //const getPrice = $('div[class="col-sm-4 p-2"] p').getText()
            const price = cartPage.getPrices.getText().replace(/[^0-9.$]/g,"")
            return price
        },

        getPrice()
        {
        
        //const getPrice = $('div[class="col-sm-4 p-2"] p').getText()
        const price = cartPage.getPrice.getText().replace(/[^0-9.$]/g,"")
            
        return price
        },
    
        deleteCartItem()
        {

            //for (var i =0;i<items[1].qty;i++){
                cartPage.cartItemDelSecond.click()
              //     }
        },

        
}