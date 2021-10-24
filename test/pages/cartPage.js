class CartPage
{

    get addedItem()
    {
        return $("//h5[text()[contains(.,'Bacardi Breezer - Tropical')]]")
    }
    get itemCount()
    {
        return $("//*[text()[contains(.,'Total Items')]]/..//h4")
    }

    get totalPayment()
    {

        return $("//*[text()[contains(.,'Total Payment')]]/..//h3")
    }

    get delete()
    {
        return $("button[class='btn btn-danger btn-sm mb-1']")
    }

    get emptyCart()
    {
        return $("//*[text()[contains(.,'Your cart is empty')]]")

    }

    get store()
    {
        return $("//a[text()[contains(.,'Store')]]")
    }

    get increaseQuantity()
    {
        return $("(//*[text()[contains(.,'Buffalo - Striploin')]]/../..//button)[1]")
    }

    get decreaseQuantity()
    {
        return $("(//*[text()[contains(.,'Buffalo - Striploin')]]/../..//button)[2]")
    }

    get increaseItemCount()
    {
        return $$('button[class="btn btn-primary btn-sm mr-2 mb-1"]')
    }

    get getPrices()
    {
        return $$('div[class="col-sm-4 p-2"] p')
    }
    get getPrice()
    {
        return $('div[class="col-sm-4 p-2"] p')
    }
    get qtys()
    {
        return $$("div[class='col-sm-2 p-2 text-center '] p")
    }
    get totolCartItem()
    {
        return $$('//div[@class="row no-gutters py-2"]')
    }

    get cartItems()
    {
        return $('//div[@class="row no-gutters py-2"]')
    }
    get cartItemDel()
    {
        return $("(//div[@class='row no-gutters py-2']/div/button[@class='btn btn-danger btn-sm mb-1'])[1]")
    }
    get cartItemDelSecond()
    {
        return $("(//div[@class='row no-gutters py-2']/div/button[@class='btn btn-danger btn-sm mb-1'])[2]")
    }
    get successMsg()
    {
        return $("div[class='p-3 text-center text-success']")
    }
    get checkoutButton()
    {
        return $("button[class='btn btn-primary mb-2']")
    }
    get clearButton()
    {
        return $("button[class='btn btn-outlineprimary btn-sm']")
    }
    get cartPageText()
    {
        return $("//*[text()[contains(.,'This is the Cart Page.')]]")
    }
}
module.exports =new CartPage
