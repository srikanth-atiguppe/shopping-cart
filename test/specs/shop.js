const cartPage = require('../pages/cartPage.js')
const storePage = require('../pages/storePage.js')
const expectchai = require('chai').expect
const fs = require('fs')
let itemDetails = JSON.parse(fs.readFileSync('test/testData/data.json'))
let items = JSON.parse(fs.readFileSync('test/testData/tc2.json'))
let assert = require('assert');
let action = require('../pages/actions.js')
const clearCartMsg = "Your cart is empty"


describe('eCommerce Apparel Shopping',()=>
{
   itemDetails.forEach(({product}) => {
   it('scenario 1: Verify cart is empty when one product is added and then deleted',()=>
      {
        browser.url('/')
        browser.waitUntil(()=>
        {return browser.getTitle()==='Store - React Boilerplate'},{timeout:5000,timeoutMsg:"store page taking more time to load",interval:1000})
        /*Add an item to the cart*/
        storePage.tshirts.filter(card=>card.getText().includes(product))
        .map(buffaloTshirt=>buffaloTshirt.$(".text-right button").click())
        browser.waitUntil(()=>
        {return storePage.cart.getText()!='Cart (0)'},{timeout:5000,timeoutMsg:"item not added",interval:1000})

        /*Go to Cart*/
        storePage.cart.click()
        browser.waitUntil(()=>
        {return browser.getTitle()==='Cart - React Boilerplate'},{timeout:5000,timeoutMsg:"cart page not loaded",interval:1000})
        /*Check that item exist in Cart*/
        expect(cartPage.addedItem).toBePresent()
        
        /*Check value of Total Items, Total Payment*/
        const cartValue = action.getCartValue()
        expect(cartPage.itemCount.getText()).toEqual(cartValue)
        

        let price = action.getPrice()
        expect(cartPage.totalPayment.getText()).toEqual(price)
        /*Check that Delete button appears for the added item*/
        expect(cartPage.delete).toExist()
        /*Click Clear button*/
        
        cartPage.clearButton.click()
        browser.waitUntil(()=>
        {return cartPage.emptyCart.getText()==='Your cart is empty'},{timeout:5000,timeoutMsg:"cart is not empty",interval:1000})
        /*Check that cart is clear*/
        expectchai(cartPage.emptyCart.getText()).to.equal(clearCartMsg)

      })
   })

     
   it('scenario 2: Verify the Checkout successful message by adding two products to the cart, delete second one product and checkout first product',()=>
   {
      browser.url('/')
      browser.waitUntil(()=>
      {return browser.getTitle()==='Store - React Boilerplate'},{timeout:5000,timeoutMsg:"store page taking more time to load",interval:1000})
      /*Add 2 items to the cart*/
      for (var i=0;i<items.length;i++){
      storePage.tshirts.filter(card=>card.getText().includes(items[i]["product"]))
      .map(buffaloTshirt=>buffaloTshirt.$(".text-right button").click())
      }
      browser.waitUntil(()=>
      {return storePage.cart.getText()!='Cart (0)'},{timeout:5000,timeoutMsg:"item not added",interval:1000})
      /*Go to Cart*/
      storePage.cart.click()
      browser.waitUntil(()=>
        {return browser.getTitle()==='Cart - React Boilerplate'},{timeout:5000,timeoutMsg:"cart page not loaded",interval:1000})

      /*For the first item, increase quantity to 3*/
      items.forEach(({qty}) => {
      expect(cartPage.addedItem).toBePresent()
      cartPage.increaseItemCount[0].click()
      })
      
      
      /*Check value of Total Items, Total Payment*/
      var totalQty = cartPage.qtys.map(getQty=>parseInt(getQty.getText().replace(/[^0-9.]/g,"")))
      .reduce((tacc,quantity)=>tacc+quantity,0)
      
     
      const cartValue = action.getCartValue()
      expect(parseInt(cartPage.itemCount.getText())).toEqual(totalQty)

      var tPrice= action.getTotalPrice()
     
      var actualPrice = parseFloat(cartPage.totalPayment.getText().replace(/[^0-9.]/g,"")).toFixed(2)
      
      assert.equal(actualPrice,tPrice)
      
      /*Check that Reduce button displays for the first item & Check that Delete button displays for the second item*/
      for (var i =0;i<cartPage.cartItems.length;i++)
      {
      expect(cartPage.cartItems.$("/div/button[@class='btn btn-danger btn-sm mb-1']")[i].toBePresent())
      }
     
      /*For the first item, decrease quantity to 2*/
      action.deleteCartItems()

      /*Check value of Total Items, Total Payment*/
      totalQty = cartPage.qtys.map(getQty=>parseInt(getQty.getText().replace(/[^0-9.]/g,"")))
      .reduce((tacc,quantity)=>tacc+quantity,0)
      expect(parseInt(cartPage.itemCount.getText())).toEqual(totalQty)
      tPrice= parseFloat(action.getTotalPrice()).toFixed(2)
     
      actualPrice = parseFloat(cartPage.totalPayment.getText().replace(/[^0-9.]/g,"")).toFixed(2)
      
      assert.equal(actualPrice,tPrice)

      /*Delete the second item & Check that the first item is removed from cart*/
      action.deleteCartItem()
      /*Click Checkout button*/
      cartPage.checkoutButton.click()

      let actualMsg = "Checkout successful"
      const expectedMsg = cartPage.successMsg.getText().substring(0,19)
      /*Check that message “Checkout successfully” displays*/
      expectchai(expectedMsg).to.equal(actualMsg)
      /*Check that cart is clear*/
      expectchai(cartPage.emptyCart.getText()).to.equal(clearCartMsg)


   })
})